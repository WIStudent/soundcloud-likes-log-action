import {of, EMPTY, from, firstValueFrom} from 'rxjs';
import {expand, concatMap, map, toArray} from 'rxjs/operators'
import fetch from 'node-fetch';
import {LikesSchema} from './schemas/types/likes.schema';
import {concatMapEager} from 'rxjs-etc/operators'
import {fetchKey} from 'soundcloud-key-fetch';
import {promises as fsp} from 'fs';
import { validateLikes, validatePlaylist, validateTracks } from './validate';
import { PlaylistSchema } from './schemas/types/playlist.schema';
import { TracksSchema } from './schemas/types/tracks.schema';

interface NarrowedUser {
  id: number;
  kind: 'user';
  permalink_url: string;
  username: string;
}
const narrowUser = ({id, kind, permalink_url, username}: NarrowedUser): NarrowedUser => ({
  id,
  kind,
  permalink_url,
  username
});

interface NarrowedTrack {
  id: number;
  kind: 'track';
  permalink_url: string;
  title: string;
  user: NarrowedUser;
}
const narrowTrack = ({id, kind, permalink_url, title, user}: NarrowedTrack): NarrowedTrack => ({
  id,
  kind,
  permalink_url,
  title,
  user: narrowUser(user)
});

interface NarrowedPlaylist {
  id: number;
  kind: 'playlist';
  permalink_url: string;
  title: string;
  track_count: number;
  user: NarrowedUser;
}
const narrowPlaylist = ({id, kind, permalink_url, title, track_count, user}: NarrowedPlaylist): NarrowedPlaylist => ({
  id,
  kind,
  permalink_url,
  title,
  track_count,
  user: narrowUser(user)
});

interface NarrowedLike {
  created_at: string;
  kind: 'like';
  track?: NarrowedTrack;
  playlist?: NarrowedPlaylist;
}
const narrowLike = ({created_at, kind, track, playlist}: NarrowedLike): NarrowedLike => ({
  created_at,
  kind,
  track: track ? narrowTrack(track) : undefined,
  playlist: playlist ? narrowPlaylist(playlist) : undefined
});

const addClientId = (url: string, clientId: string): string => {
  const u = new URL(url);
  u.searchParams.append('client_id', clientId);
  return u.href;
}


const loadJson = async (url: URL): Promise<unknown> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} ${url}`);
  }
  return await response.json();
};

const loadLikes = async (url: string): Promise<LikesSchema> => {
  const json = await loadJson(new URL(url));
  validateLikes(json);
  return json;
}

const loadPlaylist = async (clientId: string, playlistId: number): Promise<PlaylistSchema> => {
  const url = new URL(`https://api-v2.soundcloud.com/playlists/${playlistId}`);
  url.searchParams.append('client_id', clientId);
  const json = await loadJson(url);
  validatePlaylist(json);
  return json;
}

const loadTracks = async (clientId: string, trackIds: number[]): Promise<TracksSchema> => {
  if (trackIds.length === 0) {
    return [];
  }
  const url = new URL('https://api-v2.soundcloud.com/tracks');
  url.searchParams.append('ids', trackIds.join(','));
  url.searchParams.append('client_id', clientId);
  const json = await loadJson(url);
  validateTracks(json);
  return json;
}

interface PlaylistWithTracksNarrowed extends NarrowedPlaylist {
  tracks: NarrowedTrack[];
}
const addTracksToPlaylist = async (clientId: string, playlist: NarrowedPlaylist|undefined): Promise< PlaylistWithTracksNarrowed | undefined> => {
  if (playlist === undefined) {
    return undefined;
  }
  const loadedPlaylist = await loadPlaylist(clientId, playlist.id);
  // @ts-ignore
  const trackIds = loadedPlaylist.tracks.map(({id}) => id);
  const loadedTracks = await loadTracks(clientId, trackIds);
  return {
    ...playlist,
    tracks: loadedTracks.map(narrowTrack)
  }
}

const getLikes = (clientId: string, userId: string) => {
  const url = new URL(`https://api-v2.soundcloud.com/users/${userId}/likes`);
  url.searchParams.append('limit', '100');
  url.searchParams.append('client_id', clientId);

  return of({next_href: url.href, collection: []})
  .pipe(
    expand(({next_href}) => next_href === null ? EMPTY : loadLikes(addClientId(next_href, clientId))),
    concatMap(({collection}) => from(collection)),
    map(narrowLike),
    concatMapEager(async (like) => ({
      ...like,
      playlist: await addTracksToPlaylist(clientId, like.playlist)
    }), 5)
  );
};

const getUserId = async (username: string): Promise<string> => {
  const response = await fetch(`https://soundcloud.com/${username}`);
  const text = await response.text();
  const match = text.match(/soundcloud:\/\/users:\d+/);
  if (match === null) {
    throw new Error(`could not resolve user id for user name "${username}"`);
  }
  return match[0].slice(19);
}


export default async (username: string, outputPath: string) => {
  const clientId = await fetchKey();
  const userId = await getUserId(username);

  const likes = await firstValueFrom(getLikes(clientId, userId).pipe(toArray()));
  await fsp.writeFile(outputPath, JSON.stringify(likes, null, 2));
};
