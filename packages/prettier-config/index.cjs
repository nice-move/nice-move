'use strict';

const { configHas } = require('./utils.cjs');

function loadPlugin(name) {
  try {
    require.resolve(`${name}/package.json`);

    return name;
  } catch {
    return false;
  }
}

module.exports = {
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
  plugins: [
    require.resolve('@nice-move/prettier-plugin-package-json'),
    require.resolve('@prettier/plugin-xml'),
    require.resolve('prettier-plugin-ini'),
    require.resolve('./extra.cjs'),
    loadPlugin('prettier-plugin-ssh-config'),
    loadPlugin('prettier-plugin-groovy'),
    loadPlugin('prettier-plugin-java'),
    loadPlugin('prettier-plugin-nginx'),
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
        parser: 'json',
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
