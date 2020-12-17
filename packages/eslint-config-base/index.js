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

module.exports = {
  noInlineConfig: false,
  reportUnusedDisableDirectives: true,
  extends: [
    'eslint:recommended',
    'airbnb-base',
    require.resolve('./lib/import'),
    require.resolve('./lib/unicorn'),
    require.resolve('./lib/base'),
    require.resolve('./lib/html'),
    require.resolve('./lib/markdown'),
    'prettier',
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
