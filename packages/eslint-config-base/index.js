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
    'plugin:promise/recommended',
    'plugin:import/recommended',
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
    '!**/.*',
    '**/.*[cache,svn,git]/*',
    '**/*.min.*',
    '/dist/',
    'node_modules/',
    ...BestShot(),
  ],
};
