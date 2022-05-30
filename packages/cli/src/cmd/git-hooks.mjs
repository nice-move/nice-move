/* eslint-disable promise/no-nesting */
import { execa } from 'execa';

export const command = 'git';

export const description = '';

function isGitDir() {
  return execa('git', ['rev-parse', '--is-inside-git-dir']).then(
    ({ stdout }) => stdout === 'true',
  );
}

function setHook() {
  return execa('git', ['config', 'core.hooksPath', '.githooks']).then(
    ({ stderr }) => !stderr,
  );
}

export function builder(cli) {
  cli.command('hooks', 'Set .githooks as git.hooksPath', {}, () => {
    isGitDir()
      .then((okay) => {
        if (okay) {
          setHook()
            .then(() => {
              console.log('Done: set .githooks');
            })
            .catch((error) => {
              process.exitCode = 1;
              console.error('Error:', error.message);
            });
        }
      })
      .catch(() => {});
  });

  cli.demandCommand(1, 'Typing `hooks`');
}
