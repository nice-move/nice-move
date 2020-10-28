function BestShot() {
  try {
    const {
      git = [],
      eslint = git, // @ts-ignore
      // eslint-disable-next-line global-require, import/no-unresolved
    } = require('@best-shot/cli/config/ignore.json');
    return eslint;
  } catch {
    return [];
  }
}

function Electron() {
  try {
    require.resolve('electron/package.json');
    return ['plugin:import/electron'];
  } catch {
    return [];
  }
}

module.exports = {
  noInlineConfig: false,
  reportUnusedDisableDirectives: true,
  extends: [
    'eslint:recommended',
    'plugin:promise/recommended',
    'plugin:import/recommended',
    ...Electron(),
    'airbnb-base',
    'plugin:unicorn/recommended',
    'prettier',
    'prettier/unicorn',
    require.resolve('./lib/base'),
    require.resolve('./lib/import'),
    require.resolve('./lib/html'),
    require.resolve('./lib/markdown'),
  ],
  ignorePatterns: [
    '!.*',
    '.cache/',
    '.git/',
    '.svn/',
    '*.min.*',
    '/dist/',
    'node_modules/',
    ...BestShot(),
  ],
};
