'use strict';

const { readJson, getPkg } = require('settingz');

function ignoreList() {
  const { ignore: { all = [], eslint = [] } = {} } = getPkg('nice-move');

  return [...all, ...eslint];
}

function BestShot() {
  const { git = [], eslint = git } = readJson(
    '@best-shot/cli/config/ignore.json',
  );

  return eslint;
}

module.exports = {
  noInlineConfig: false,
  reportUnusedDisableDirectives: true,
  plugins: ['regexp'],
  extends: [
    'eslint:recommended',
    'airbnb-base',
    require.resolve('./lib/unicorn.cjs'),
    require.resolve('./lib/promise.cjs'),
    require.resolve('./lib/import.cjs'),
    require.resolve('./lib/base.cjs'),
    require.resolve('./lib/node.cjs'),
    require.resolve('./lib/typescript.cjs'),
    require.resolve('./lib/markdown.cjs'),
    require.resolve('./lib/test.cjs'),
    require.resolve('./lib/mini.cjs'),
    'plugin:@nice-move/html/recommended',
    'plugin:regexp/recommended',
    'prettier',
  ],
  ignorePatterns: [
    '!.*',
    '.cache/',
    '.git/',
    '.svn/',
    '*.min.*',
    '**/.docusaurus/**',
    '**/.obsidian/**',
    '**/dist/**',
    '**/miniprogram_npm/**',
    '**/node_modules/**',
    ...BestShot(),
    ...ignoreList(),
  ],
};
