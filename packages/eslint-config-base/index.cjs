'use strict';

const {
  configHas,
  matches: { sourceAndPackages },
} = require('./lib/utils.cjs');

function BestShot() {
  try {
    const {
      git = [],
      eslint = git, // @ts-ignore
      // eslint-disable-next-line import/no-unresolved
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
    require.resolve('./lib/electron.cjs'),
    require.resolve('./lib/node.cjs'),
    require.resolve('./lib/bundler.cjs'),
    require.resolve('./lib/typescript.cjs'),
    require.resolve('./lib/markdown.cjs'),
    require.resolve('./lib/test.cjs'),
    require.resolve('./lib/mini.cjs'),
    'prettier',
  ],
  ...configHas(
    ({ globals }) => globals,
    (globals) => ({
      overrides: [
        {
          files: sourceAndPackages,
          globals,
        },
      ],
    }),
  ),
  ignorePatterns: [
    '!.*',
    '.cache/',
    '.git/',
    '.svn/',
    '*.min.*',
    '/dist/',
    '**/miniprogram_npm/**',
    'node_modules/',
    ...BestShot(),
  ],
};
