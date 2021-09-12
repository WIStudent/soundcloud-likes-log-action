import Ajv, { ErrorObject } from 'ajv';
import userSchema from './schemas/user.schema.json';
import trackSchema from './schemas/track.schema.json';
import tracksSchema from './schemas/tracks.schema.json';
import { TracksSchema } from './schemas/types/tracks.schema';
import basePlaylistSchema from './schemas/basePlaylist.schema.json';
import playlistSchema from './schemas/playlist.schema.json';
import { PlaylistSchema } from './schemas/types/playlist.schema';
import likesSchema from './schemas/likes.schema.json';
import { LikesSchema } from './schemas/types/likes.schema';

let ajv: Ajv|undefined = undefined;

class ValidationError extends Error {
  constructor(ajvErrors: ErrorObject[]) {
    const message = ajvErrors.map(({message}) => message).join(', ');
    super(message);
  }
}

const getAjv = (): Ajv => {
  ajv = ajv ?? new Ajv({
    schemas: [userSchema, trackSchema, tracksSchema, basePlaylistSchema, playlistSchema, likesSchema]
  });
  return ajv;
};

function assertDefined<T>(value: T, msg?: string): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error(msg ?? 'value is null or undefined');
  }
}

function validate<T>(data: unknown, schemaId: string): asserts data is T {
  const validateFn = getAjv().getSchema(schemaId);
  assertDefined(validateFn, `no validateFn found for schemaId ${schemaId}`);
  if (!validateFn(data)) {
    throw new ValidationError(validateFn.errors ?? []);
  }
}

export function validateTracks(data: unknown): asserts data is TracksSchema {
  validate(data, tracksSchema.$id);
}

export function validatePlaylist(data: unknown): asserts data is PlaylistSchema {
  validate(data, playlistSchema.$id);
}

export function validateLikes(data: unknown): asserts data is LikesSchema {
  validate(data, likesSchema.$id);
}
