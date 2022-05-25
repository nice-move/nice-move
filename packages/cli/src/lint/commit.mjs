import { readFile } from 'fs/promises';
import { resolve } from 'path';

const rules = {
  'body-leading-blank': [1, 'always'],
  'body-max-line-length': [2, 'always', 100],
  'footer-leading-blank': [1, 'always'],
  'footer-max-line-length': [2, 'always', 100],
  'header-max-length': [2, 'always', 100],
  'subject-case': [0],
  'subject-empty': [2, 'never'],
  'subject-full-stop': [2, 'never', '.'],
  'type-case': [2, 'always', 'lower-case'],
  'type-empty': [2, 'never'],
  'type-enum': [
    2,
    'always',
    [
      'build',
      'chore',
      'ci',
      'docs',
      'feat',
      'fix',
      'perf',
      'refactor',
      'revert',
      'style',
      'test',
    ],
  ],
  'scope-case': [0],
  'body-case': [0],
  'header-case': [0],
};

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
