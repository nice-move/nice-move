'use strict';

const { join } = require('node:path');
const { readJson, getPkg } = require('settingz');

function ignoreList() {
  const { ignore: { all = [], stylelint = [] } = {} } = getPkg('nice-move');

  return [...all, ...stylelint];
}

function BestShot() {
  const { git = [], stylelint = git } = readJson(
    '@best-shot/cli/config/ignore.json',
  );

  return stylelint;
}

module.exports = {
  ignoreFiles: [
    '**/*.min.*',
    '**/dist/**',
    '**/.(cache|svn|git)/**',
    '**/.docusaurus/**',
    '**/miniprogram_npm/**',
    ...BestShot(),
    ...ignoreList(),
  ].map((item) => join(process.cwd(), item)),
};
