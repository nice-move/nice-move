function BestShot() {
  try {
    const {
      git = [],
      eslint = git, // @ts-ignore
      // eslint-disable-next-line import/no-unresolved, node/no-missing-require
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
    require.resolve('./lib/promise.cjs'),
    require.resolve('./lib/html.cjs'),
    require.resolve('./lib/import.cjs'),
    require.resolve('./lib/base.cjs'),
    require.resolve('./lib/markdown.cjs'),
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
