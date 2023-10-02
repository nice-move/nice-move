import { getPkg } from 'settingz';

import { getConfig } from './get-config.mjs';

function getDependencies() {
  const devDependencies = getPkg('devDependencies');

  const prettier = 'prettier' in devDependencies;
  const eslint = 'eslint' in devDependencies;
  const stylelint = 'stylelint' in devDependencies;
  const garou = 'garou' in devDependencies;

  return { garou, stylelint, eslint, prettier };
}

async function linter() {
  const { default: lintStaged } = await import('lint-staged');

  const dependencies = getDependencies();

  const config = getConfig(dependencies);

  return lintStaged({
    allowEmpty: true,
    concurrent: true,
    config,
    cwd: process.cwd(),
    debug: false,
    quiet: false,
    relative: false,
    shell: false,
    stash: true,
  });
}

export function staged(cli) {
  cli.command('staged', 'Lint and format git staged files', {}, () => {
    linter()
      .then((passed) => {
        process.exitCode = passed ? 0 : 1;
      })
      .catch((error) => {
        console.error(error);
        process.exitCode = 1;
      });
  });
}
