'use strict';

const { join } = require('path');
const { pkgHas, configHas } = require('./utils.cjs');

const Vscode = pkgHas(
  ({ engines: { vscode } = {} }) => vscode,
  () => ({ 'import/core-modules': ['vscode'] }),
);

module.exports = {
  extends: ['plugin:import/recommended'],
  rules: {
    'import/extensions': [
      'error',
      'always',
      {
        ignorePackages: true,
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.{test,spec}.{m,c,}{t,j}s',
          '{test,tests,try}.{m,c,}{t,j}s',
          '{test,tests,config}/**/*.{m,c,}{t,j}s',
          '**/.*rc.{m,c,}{t,j}s',
          '**/*.config.{m,c,}{t,j}s',
          '**/config.{m,c,}{t,j}s',
          '.best-shot/**',
        ],
      },
    ],
    'import/newline-after-import': 0,
    'import/no-dynamic-require': 0,
    'import/order': 0,
    'import/prefer-default-export': 0,
    'import/no-relative-packages': 0,
  },
  settings: {
    ...Vscode,
    'import/extensions': ['.tsx', '.ts', '.vue', '.jsx', '.js', '.mjs', '.cjs'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
      'vue-eslint-parser': ['.vue'],
      [require.resolve('./jsx-parser.cjs')]: ['.jsx'],
    },
    'import/ignore': false,
    ...configHas(
      ({ 'internal-regex': internalRegex }) => internalRegex,
      (internalRegex) => ({ 'import/internal-regex': internalRegex }),
    ),
  },
  overrides: [
    pkgHas(
      ({ workspaces }) =>
        workspaces && (workspaces.packages || workspaces).length > 0,
      (_, { workspaces }) => ({
        files: (workspaces.packages || workspaces).map((item) =>
          join(item, '*'),
        ),
        rules: {
          'import/no-relative-packages': 'warn',
        },
        settings: {
          'import/internal-regex': false,
        },
      }),
    ),
    {
      files: '**/*',
      excludedFiles: ['*.cjs'],
      rules: {
        'import/no-commonjs': 'error',
      },
    },
    {
      files: '**/*.*',
      excludedFiles: '*.{m,c}js',
      rules: {
        'import/no-nodejs-modules': 'error',
      },
    },
  ].filter(Boolean),
};
