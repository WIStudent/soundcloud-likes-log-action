import { getInput } from '@actions/core';
import createLikesLog from './createLikesLog';

const main = async () => {
  const username = getInput('username');
  const outputPath = getInput('output-path');
  await createLikesLog(username, outputPath);
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
