import { getPkg } from 'settingz/index.mjs';

import { parseImportGroups } from './lib.mjs';
import { configHas, loadPlugin, require } from './utils.mjs';

function readConfig() {
  try {
    const {
      'nice-move': {
        'import-groups': config = [],
        'internal-regex': internalRegex,
      } = {},
    } = getPkg();

    return parseImportGroups(internalRegex ? [config, internalRegex] : config);
  } catch {
    return [];
  }
}

export default {
  htmlWhitespaceSensitivity: 'css',
  iniSpaceAroundEquals: true,
  singleQuote: true,
  trailingComma: 'all',
  xmlSortAttributesByKey: true,
  xmlWhitespaceSensitivity: 'strict',
  tailwindFunctions: [
    'clsx',
    'classnames',
    'classname',
    'classNames',
    'className',
  ],
  importOrder: [
    '<BUILTIN_MODULES>',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '<TYPES>',
    '',
    ...readConfig(),
    '',
    '^@/(.*)$',
    '',
    '<TYPES>^[.][.]/',
    '',
    String.raw`^\.\./`,
    '',
    '<TYPES>^[.]',
    '',
    String.raw`^\./`,
  ].flat(),
  plugins: [
    require.resolve('@nice-move/prettier-plugin-package-json'),
    require.resolve('@prettier/plugin-xml'),
    require.resolve('prettier-plugin-ini'),
    require.resolve('prettier-plugin-css-order'),
    require.resolve('@nice-move/prettier-plugin-sort-imports'),
    require.resolve('./extra.mjs'),
    loadPlugin('prettier-plugin-diy'),
    loadPlugin('prettier-plugin-groovy'),
    loadPlugin('prettier-plugin-java'),
    loadPlugin('prettier-plugin-nginx'),
    loadPlugin('prettier-plugin-ssh-config'),
    loadPlugin('@cospaia/prettier-plugin-clojure'),
    loadPlugin('prettier-plugin-tailwindcss'),
  ].filter(Boolean),
  overrides: [
    {
      files: ['*.vue'],
      options: {
        tailwindAttributes: [
          'label-class',
          'value-class',
          'title-class',
          'class-name',
        ],
      },
    },
    {
      files: ['*.jsx', '*.tsx'],
      options: {
        tailwindAttributes: [
          'expandedRowClassName',
          'maskClassName',
          'overlayClassName',
          'popupClassName',
          'rootClassName',
          'rowClassName',
          'wrapClassName',
          'wrapperClassName',
        ],
      },
    },
    {
      files: ['*.json'],
      options: {
        parser: 'json-stringify',
      },
    },
    {
      files: ['.*rc', '.*rc.json', '{t,j}sconfig.json', '.vscode/*.json'],
      options: {
        parser: 'jsonc',
      },
    },
    {
      files: 'package.json',
      options: {
        parser: 'package-json',
      },
    },
    {
      files: '*.md',
      options: {
        trailingComma: 'none',
      },
    },
    {
      files: ['*.html', '*.htm'],
      options: {
        trailingComma: 'es5',
      },
    },
    {
      files: ['.npmrc', '*.editorconfig', '*.ini', '.sentryclirc'],
      options: {
        parser: 'ini',
      },
    },
    {
      files: ['*.ttss', '*.jxss', '*.acss', '*.wxss', '*.qss'],
      options: {
        parser: 'css',
      },
    },
    {
      files: ['*.wxs', '*.qs'],
      options: {
        parser: 'babel',
        trailingComma: 'es5',
      },
    },
    {
      files: ['*.wxml'],
      options: {
        parser: 'html',
      },
    },
    {
      files: '.ssh/config',
      options: {
        parser: 'ssh-config',
      },
    },
    {
      files: ['pnpm-lock.yaml'],
      options: {
        requirePragma: true,
      },
    },
    ...(configHas(
      ({ prettier = [] }) => prettier,
      (bundle) => bundle,
    ) || []),
  ],
};
