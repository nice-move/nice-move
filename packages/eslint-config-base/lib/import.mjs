import { fileURLToPath } from 'node:url';

import { flatConfigs } from 'eslint-plugin-import-x';

import { configHas, pkgHas } from './utils.mjs';

const Vscode = pkgHas(
  ({ engines: { vscode } = {} }) => vscode,
  () => ({ 'import-x/core-modules': ['vscode'] }),
);

export default [
  flatConfigs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx,cjs,mjs,cts,mts}'],
    ignores: [
      '**/*.config.{m,c}{j,t}s',
      '.config/**/.{m,c}{j,t}s',
      'config/**/.{m,c}{j,t}s',
      '**/*.d.{m,c,}ts',
      '**/*.md/*',
    ],
    rules: {
      'import-x/no-default-export': 'warn',
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx,cjs,mjs,cts,mts,qs,wxs,vue}'],
    rules: {
      'import-x/extensions': [
        'error',
        'always',
        {
          ignorePackages: true,
        },
      ],
      'import-x/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.{test,spec}.{m,c,}{t,j}s',
            '**/{test,tests}.{m,c,}{t,j}s',
            '**/{test,tests}/**/*.{m,c,}{t,j}s',
            '{ci,config,try}/**/*.{m,c,}{t,j}s',
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
      'import-x/newline-after-import': 0,
      'import-x/no-dynamic-require': 0,
      'import-x/no-empty-named-blocks': 'error',
      'import-x/no-relative-packages': 0,
      'import-x/order': 0,
      'import-x/prefer-default-export': 0,
      'import-x/no-cycle': 0,
      'import-x/no-duplicates': ['warn', { considerQueryString: true }],
    },
    settings: {
      ...Vscode,
      'import-x/extensions': [
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
      'import-x/parsers': {
        '@typescript-eslint/parser': ['.ts', '.cts', '.mts', '.tsx'],
        'vue-eslint-parser': ['.vue'],
        [fileURLToPath(import.meta.resolve('./jsx-parser.cjs'))]: ['.jsx'],
      },
      'import-x/ignore': false,
      ...configHas(
        ({ 'internal-regex': internalRegex }) => internalRegex,
        (internalRegex) => ({ 'import-x/internal-regex': internalRegex }),
      ),
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx,vue,qs,wxs}'],
    rules: {
      'import-x/no-nodejs-modules': 'error',
    },
  },
];
