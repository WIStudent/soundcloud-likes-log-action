declare module 'soundcloud-key-fetch' {
  export const fetchKey: () => Promise<string>;
  export const testKey: () => Promise<boolean>;
}
