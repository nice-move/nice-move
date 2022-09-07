'use strict';

const {
  overrides: [{ rules: base }],
} = require('@typescript-eslint/eslint-plugin/dist/configs/eslint-recommended.js');
const {
  rules,
} = require('@typescript-eslint/eslint-plugin/dist/configs/recommended.js');

function filterObject(object, filter) {
  return Object.fromEntries(
    Object.entries(object).filter(([key, value]) => filter(key, value)),
  );
}

module.exports = {
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.mts', '*.cts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      // parserOptions: {
      //   tsconfigRootDir: process.cwd(),
      //   project: ['./tsconfig.json'],
      // },
      // extends: [
      //   'plugin:@typescript-eslint/recommended-requiring-type-checking',
      //   'airbnb-typescript',
      // ],
      rules: {
        ...filterObject(base, (_key, value) => value !== 'off' && value !== 0),
        ...rules,
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_+$',
            ignoreRestSiblings: true,
            varsIgnorePattern: '^_+$',
          },
        ],
        'import/extensions': [
          'error',
          'always',
          {
            ignorePackages: true,
            pattern: {
              ts: 'never',
              mts: 'never',
              cts: 'never',
              tsx: 'never',
            },
          },
        ],
      },
      settings: {
        'import/resolver': {
          node: {
            extensions: ['.ts', '.cts', '.mts', '.tsx'],
          },
        },
      },
    },
  ],
};
