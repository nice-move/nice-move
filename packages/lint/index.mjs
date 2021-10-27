import { createRequire } from 'module';

import lintStaged from 'lint-staged';

import { getConfig } from './lib/get-config.mjs';

function getMaxArgLength() {
  switch (process.platform) {
    case 'darwin':
      return 262144;
    case 'win32':
      return 8191;
    default:
      return 131072;
  }
}

const requireJson = createRequire(`${process.cwd()}/`);

function readJson() {
  try {
    return requireJson('./package.json');
  } catch (error) {
    console.error(error);
    return {};
  }
}

function getDependencies() {
  const { devDependencies = {} } = readJson();

  const prettier = 'prettier' in devDependencies;
  const eslint = 'eslint' in devDependencies;
  const stylelint = 'stylelint' in devDependencies;
  const garou = 'garou' in devDependencies;
  const rustywind = 'rustywind' in devDependencies;
  const typescript = 'typescript' in devDependencies;

  return { rustywind, garou, stylelint, eslint, prettier, typescript };
}

export function lint({ shell }) {
  const dependencies = getDependencies();

  const config = getConfig(dependencies);

  lintStaged({
    allowEmpty: true,
    concurrent: true,
    config,
    cwd: process.cwd(),
    debug: false,
    maxArgLength: getMaxArgLength() / 2,
    quiet: false,
    relative: false,
    shell: Boolean(shell),
    stash: true,
  })
    .then((passed) => {
      process.exitCode = passed ? 0 : 1;
    })
    .catch(() => {
      process.exitCode = 1;
    });
}
