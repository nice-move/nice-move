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
    require.resolve('./lib/unicorn.cjs'),
    require.resolve('./lib/html.cjs'),
    require.resolve('./lib/markdown.cjs'),
    require.resolve('./lib/import.cjs'),
    require.resolve('./lib/base.cjs'),
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
