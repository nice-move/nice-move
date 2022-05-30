import execa from 'execa';

export const command = 'git';

export const description = '';

const cwd = process.cwd();

function gitSupport() {
  try {
    return Boolean(execa.sync('git', ['--version'], { cwd }).stdout);
  } catch {
    throw new Error('git is not installed');
  }
}

function isGitDir() {
  try {
    return (
      execa.sync('git', ['rev-parse', '--is-inside-work-tree'], {
        cwd,
      }).stdout === 'true'
    );
  } catch {
    throw new Error('not a git repository');
  }
}

function setHook() {
  return execa('git', ['config', 'core.hooksPath', '.githooks'], {
    cwd,
  });
}

function check() {
  try {
    return gitSupport() && isGitDir();
  } catch (error) {
    console.error('Fail:', error.message);

    return false;
  }
}

export function builder(cli) {
  cli.command('hooks', 'Set .githooks as git.hooksPath', {}, () => {
    if (check()) {
      setHook()
        .then(() => {
          console.log('Done: set .githooks');
        })
        .catch(() => {
          console.error('Fail:', 'setting hooks failed');
          process.exitCode = 1;
        });
    }
  });

  cli.demandCommand(1, 'Typing `hooks`');
}
