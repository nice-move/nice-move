// eslint-disable-next-line import/no-unresolved
import lintStaged from 'lint-staged';
import { getPkg } from 'settingz';

import { getConfig } from '../lib/get-config.mjs';

function getDependencies() {
  const devDependencies = getPkg('devDependencies');

  const prettier = 'prettier' in devDependencies;
  const eslint = 'eslint' in devDependencies;
  const stylelint = 'stylelint' in devDependencies;
  const garou = 'garou' in devDependencies;
  const rustywind = 'rustywind' in devDependencies;
  const typescript = 'typescript' in devDependencies;

  return { rustywind, garou, stylelint, eslint, prettier, typescript };
}

export const command = 'lint staged';

export const describe = 'Lint and format git staged files';

export function handler() {
  const dependencies = getDependencies();

  const config = getConfig(dependencies);

  lintStaged({
    allowEmpty: true,
    concurrent: true,
    config,
    cwd: process.cwd(),
    debug: false,
    quiet: false,
    relative: false,
    shell: false,
    stash: true,
  })
    .then((passed) => {
      process.exitCode = passed ? 0 : 1;
    })
    .catch(() => {
      process.exitCode = 1;
    });
}
