import { execa } from 'execa';
import isGitRepo from 'is-git-repository';

export const command = 'git';

export const description = '';

export async function gitSupport() {
  try {
    const { stdout } = await execa('git', ['--version']);

    return Boolean(stdout);
  } catch {
    return false;
  }
}

export function builder(cli) {
  cli.command('hooks', 'Set .githooks as git.hooksPath', {}, () => {
    gitSupport()
      .then((support) => {
        if (support && isGitRepo()) {
          // eslint-disable-next-line promise/no-nesting
          execa('git config core.hooksPath .githooks')
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
