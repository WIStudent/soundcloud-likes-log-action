import fetch from 'node-fetch';

const SCRIPT_REGEX = /<script crossorigin src="(.+?)">/g;
const CLIENT_ID_REGEX = /client_id:"(.+?)"/g;

// Soundcloud seems to block the access to soundcloud.com from github runner ip addresses, but the access to the scripts themselves is still possible.
// Use these script urls as fallback if they could not be scrapped from soundcloud.com.
const FALLBACK_SCRIPT_SRCS = [
  "https://a-v2.sndcdn.com/assets/0-18778ebb.js",
  "https://a-v2.sndcdn.com/assets/3-d97f3637.js",
  "https://a-v2.sndcdn.com/assets/50-d480c257.js"
]

const getClientIdFromScriptSrc = async(scriptSrc: string): Promise<string> => {
  const script = await fetch(scriptSrc).then(r => r.text());
  const clientIdMatch = script.matchAll(CLIENT_ID_REGEX).next();
  if (clientIdMatch.done) {
    throw new Error('clientId not found');
  }
  return clientIdMatch.value[1];
};

const getScriptSrcs = async(): Promise<string[]> => {
  const response = await fetch("https://soundcloud.com/");
  if (!response.ok) {
    return FALLBACK_SCRIPT_SRCS;
  }
  const site = await response.text();
  const scriptSrcs = Array.from(site.matchAll(SCRIPT_REGEX)).map(matches => matches[1]);
  return scriptSrcs.length === 0 ? FALLBACK_SCRIPT_SRCS : scriptSrcs;
}

export default async (): Promise<string> => {
  const scriptSrcs = await getScriptSrcs();
  try {
    return await Promise.any(scriptSrcs.map(src => getClientIdFromScriptSrc(src)));
  } catch {
    throw new Error(`Could not find clientID within scripts ${JSON.stringify(scriptSrcs)}`);
  }
};
