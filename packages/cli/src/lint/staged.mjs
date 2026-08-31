import { getPkg } from 'settingz';

import { getConfig } from './get-config.mjs';

function getDependencies() {
  const devDependencies = getPkg('devDependencies');

  const isPrettier = 'prettier' in devDependencies;
  const isEslint = 'eslint' in devDependencies;
  const isStylelint = 'stylelint' in devDependencies;
  const isGarou = 'garou' in devDependencies;

  return {
    garou: isGarou,
    stylelint: isStylelint,
    eslint: isEslint,
    prettier: isPrettier,
  };
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
