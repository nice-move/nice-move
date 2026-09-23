import { join } from 'node:path';

import { readJson, getPkg } from 'settingz';

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

export default {
  ignoreFiles: [
    '**/*.min.*',
    '**/dist/**',
    '**/.(cache|svn|git)/**',
    '**/.docusaurus/**',
    '**/.obsidian/**',
    '**/miniprogram_npm/**',
    ...BestShot(),
    ...ignoreList(),
  ].map((item) => join(process.cwd(), item)),
};
