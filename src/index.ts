import core from '@actions/core';
import createLikesLog from './createLikesLog';

const main = async () => {
  const username = core.getInput('username');
  const outputPath = core.getInput('output-path');
  await createLikesLog(username, outputPath);
};

main();
