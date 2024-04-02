'use strict';

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
          '.*/config.{m,c,}{t,j}s',
          '**/.best-shot/**',
          ...(configHas(
            ({ bundle = [] }) => bundle,
            (bundle) => bundle,
          ) || []),
        ],
      },
    ],
    'import/newline-after-import': 0,
    'import/no-default-export': 'warn',
    'import/no-dynamic-require': 0,
    'import/no-empty-named-blocks': 'error',
    'import/no-relative-packages': 0,
    'import/order': 0,
    'import/prefer-default-export': 0,
    'import/no-cycle': 0,
  },
  settings: {
    ...Vscode,
    'import/extensions': [
      '.tsx',
      '.ts',
      '.cts',
      '.mts',
      '.vue',
      '.jsx',
      '.js',
      '.mjs',
      '.cjs',
    ],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.cts', '.mts', '.tsx'],
      'vue-eslint-parser': ['.vue'],
      [require.resolve('./jsx-parser.cjs')]: ['.jsx'],
    },
    'import/ignore': false,
    ...configHas(
      ({ 'internal-regex': internalRegex }) => internalRegex,
      (internalRegex) => ({ 'import/internal-regex': internalRegex }),
    ),
    'import/resolver': {
      node: false,
      [require.resolve('./node-next-resolver.cjs')]:
        configHas(
          ({ 'import-http': importHttp }) => importHttp,
          (importHttp) => ({ importHttp }),
        ) || {},
    },
  },
  overrides: [
    {
      files: '**/*.*',
      excludedFiles: '*.{m,c}{j,t}s',
      rules: {
        'import/no-nodejs-modules': 'error',
      },
    },
  ],
};
