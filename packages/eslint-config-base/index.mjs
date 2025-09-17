import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { recommended as html } from '@nice-move/eslint-plugin-html/lib/configs-next.mjs';
import airbnb from 'eslint-config-airbnb-base';
import prettier from 'eslint-config-prettier';
import { getPkg, readJson } from 'settingz';

import base, { all as allExts } from './lib/base.mjs';
import imports from './lib/import.mjs';
import markdown from './lib/markdown.mjs';
import mini from './lib/mini.mjs';
import node from './lib/node.mjs';
import promise from './lib/promise.mjs';
import typescript from './lib/typescript.mjs';
import unicorn from './lib/unicorn.mjs';
import { pkgHas } from './lib/utils.mjs';

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

const old = compat.config(airbnb).map((item) => {
  delete item.plugins;

  item.files = allExts;

  return item;
});

export const create = (...addings) => [
  {
    files: allExts,
    ...js.configs.recommended,
  },
  ...old,
  ...addings,
  ...unicorn,
  ...promise,
  ...imports,
  ...base,
  ...pkgHas(
    ({ devDependencies: { electron } = {} }) => electron,
    () => [
      {
        files: ['src/**/*.{mjs,mts,cjs,cts}'],
        settings: {
          'import/core-modules': ['electron'],
        },
      },
    ],
  ),
  ...node,
  ...typescript,
  ...markdown,
  ...mini,
  ...html,
  ...compat.config(prettier),
  {
    linterOptions: {
      noInlineConfig: false,
      reportUnusedDisableDirectives: true,
    },
  },
  {
    ignores: [
      '**/*.min.*',
      '**/.cache/',
      '**/.git/',
      '**/.svn/',
      '**/.docusaurus/',
      '**/.obsidian/',
      '**/dist/',
      '**/miniprogram_npm/',
      '**/node_modules/',
      ...BestShot(),
      ...ignoreList(),
    ],
  },
];

export default create();
