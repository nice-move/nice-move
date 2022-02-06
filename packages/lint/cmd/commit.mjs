import { readFile } from 'fs/promises';
import { resolve } from 'path';

import { rules } from '../lib/rules.mjs';

function getFilename() {
  return resolve(process.cwd(), '.git/COMMIT_EDITMSG');
}

function readCommitMessage() {
  return readFile(getFilename(), 'utf-8');
}

async function linter() {
  const commitMessage = await readCommitMessage();

  const lint = await import('@commitlint/lint').then((io) => io.default);
  const format = await import('@commitlint/format').then((io) => io.default);

  const result = await lint(commitMessage, rules);
  const output = await format({ results: [result] });

  return { result, output };
}

export const command = 'lint commit';

export const describe = 'Lint git commit message';

export function handler() {
  console.log('nice-move lint commit:');

  linter()
    .then(({ result, output }) => {
      if (result.valid) {
        console.log('Pass.');
      } else {
        console.log('Fail:');
        console.log(output);
        process.exitCode = 1;
      }
    })
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
}
