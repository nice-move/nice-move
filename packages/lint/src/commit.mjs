import { readFile } from 'fs/promises';
import { resolve } from 'path';

import { rules } from '../lib/rules.mjs';

function getFilename() {
  return resolve(process.cwd(), '.git/COMMIT_EDITMSG');
}

function readCommitMessage() {
  return readFile(getFilename(), 'utf8');
}

async function linter() {
  const commitMessage = await readCommitMessage();

  const lint = await import('@commitlint/lint').then(
    (io) => io.default.default || io.default,
  );
  const format = await import('@commitlint/format').then(
    (io) => io.default.default || io.default,
  );

  const result = await lint(commitMessage, rules);
  const output = await format({ results: [result] });

  return { result, output };
}

export function commit(cli) {
  cli.command('commit', 'Lint git commit message', {}, () => {
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
  });
}
