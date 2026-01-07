import { fileURLToPath } from 'node:url';

import imports from 'eslint-plugin-import';

import { configHas, pkgHas } from './utils.mjs';

const Vscode = pkgHas(
  ({ engines: { vscode } = {} }) => vscode,
  () => ({ 'import/core-modules': ['vscode'] }),
);

export default [
  imports.flatConfigs.recommended,
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
      'import/no-default-export': 'warn',
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx,cjs,mjs,cts,mts,qs,wxs,vue}'],
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
            '**/{test,tests}.{m,c,}{t,j}s',
            '**/{test,tests}/**/*.{m,c,}{t,j}s',
            '{config,try}/**/*.{m,c,}{t,j}s',
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
      'import/no-dynamic-require': 0,
      'import/no-empty-named-blocks': 'error',
      'import/no-relative-packages': 0,
      'import/order': 0,
      'import/prefer-default-export': 0,
      'import/no-cycle': 0,
      'import/no-duplicates': ['warn', { considerQueryString: true }],
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
        [fileURLToPath(import.meta.resolve('./jsx-parser.cjs'))]: ['.jsx'],
      },
      'import/ignore': false,
      ...configHas(
        ({ 'internal-regex': internalRegex }) => internalRegex,
        (internalRegex) => ({ 'import/internal-regex': internalRegex }),
      ),
      'import/resolver': {
        node: false,
        [fileURLToPath(import.meta.resolve('./node-next-resolver.cjs'))]:
          configHas(
            ({ 'import-http': importHttp }) => importHttp,
            (importHttp) => ({ importHttp }),
          ) || {},
      },
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx,vue,qs,wxs}'],
    rules: {
      'import/no-nodejs-modules': 'error',
    },
  },
];
