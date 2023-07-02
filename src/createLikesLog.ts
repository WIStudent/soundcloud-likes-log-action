import {of, EMPTY, from, firstValueFrom} from 'rxjs';
import {expand, concatMap, map, toArray} from 'rxjs/operators'
import fetch from 'node-fetch';
import {LikesSchemaJson} from './schemas/types/likes.schema';
import {promises as fsp} from 'fs';
import { validateLikes, validatePlaylist, validateTracks, validateUsersearch } from './validate';
import { PlaylistSchemaJson } from './schemas/types/playlist.schema';
import { TracksSchemaJson } from './schemas/types/tracks.schema';
import getClientId from './getClientId';

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


const loadJson = async (url: string): Promise<unknown> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} ${url}`);
  }
  return await response.json();
};

const loadLikes = async (url: string): Promise<LikesSchemaJson> => {
  const json = await loadJson(url);
  validateLikes(json);
  return json;
}

const loadPlaylist = async (clientId: string, playlistId: number): Promise<PlaylistSchemaJson> => {
  const url = new URL(`https://api-v2.soundcloud.com/playlists/${playlistId}`);
  url.searchParams.append('client_id', clientId);
  const json = await loadJson(url.href);
  validatePlaylist(json);
  return json;
}

const loadTracks = async (clientId: string, trackIds: number[]): Promise<TracksSchemaJson> => {
  if (trackIds.length === 0) {
    return [];
  }
  const url = new URL('https://api-v2.soundcloud.com/tracks');
  url.searchParams.append('ids', trackIds.join(','));
  url.searchParams.append('client_id', clientId);
  const json = await loadJson(url.href);
  validateTracks(json);
  const trackMap = new Map(json.map(t => [t.id, t]));
  const tracks = trackIds.map(id => {
    const track = trackMap.get(id);
    if (track === undefined) {
      throw new Error(`could not load track for trackId ${id}`);
    }
    return track;
  });
  return tracks;
}

interface PlaylistWithTracksNarrowed extends NarrowedPlaylist {
  tracks: NarrowedTrack[];
}
const addTracksToPlaylist = async (clientId: string, playlist: NarrowedPlaylist|undefined): Promise< PlaylistWithTracksNarrowed | undefined> => {
  if (playlist === undefined) {
    return undefined;
  }
  const loadedPlaylist = await loadPlaylist(clientId, playlist.id);
  const trackIds = loadedPlaylist.tracks.map(({id}) => id);
  const loadedTracks = await loadTracks(clientId, trackIds);
  return {
    ...playlist,
    tracks: loadedTracks.map(narrowTrack)
  }
}

const getLikes = (clientId: string, userId: number) => {
  const url = new URL(`https://api-v2.soundcloud.com/users/${userId}/likes`);
  url.searchParams.append('limit', '100');
  url.searchParams.append('client_id', clientId);

  return of({next_href: url.href, collection: []})
  .pipe(
    expand(({next_href}) => next_href === null ? EMPTY : loadLikes(addClientId(next_href, clientId))),
    concatMap(({collection}) => from(collection)),
    map(narrowLike),
    concatMap(async (like) => ({
      ...like,
      playlist: await addTracksToPlaylist(clientId, like.playlist)
    }))
  );
};

const getUserId = async (clientId: string, username: string): Promise<number> => {
  const url = new URL("https://api-v2.soundcloud.com/search/users");
  url.searchParams.append('q', username);
  const json = await loadJson(addClientId(url.href, clientId));
  validateUsersearch(json);
  const userEntry = json.collection.find(entry => entry.permalink === username);
  if (userEntry === undefined) {
    throw new Error(`could not resolve user id for user name "${username}"`);
  }
  return userEntry.id
}


export default async (username: string, outputPath: string) => {
  const clientId = await getClientId();
  const userId = await getUserId(clientId, username);

  const likes = await firstValueFrom(getLikes(clientId, userId).pipe(toArray()));
  await fsp.writeFile(outputPath, JSON.stringify(likes, null, 2));
};
