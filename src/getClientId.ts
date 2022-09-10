import fetch from 'node-fetch';

const SCRIPT_REGEX = /<script crossorigin src="(.+?)">/g;
const CLIENT_ID_REGEX = /client_id:"(.+?)"/g;

const getClientIdFromScriptSrc = async(scriptSrc: string): Promise<string> => {
  const script = await fetch(scriptSrc).then(r => r.text());
  const clientIdMatch = script.matchAll(CLIENT_ID_REGEX).next();
  if (clientIdMatch.done) {
    throw new Error('clientId not found');
  }
  return clientIdMatch.value[1];
};

export default async (): Promise<string> => {
  const site = await fetch("https://soundcloud.com/").then(r => r.text());
  const scriptSrcs = Array.from(site.matchAll(SCRIPT_REGEX)).map(matches => matches[1]);
  return Promise.any(scriptSrcs.map(src => getClientIdFromScriptSrc(src)));
};
