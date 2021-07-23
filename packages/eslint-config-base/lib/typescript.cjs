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
  settings: {
    // https://github.com/benmosher/eslint-plugin-import/blob/master/config/typescript.js
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
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
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_+$',
            ignoreRestSiblings: true,
            varsIgnorePattern: '^_+$',
          },
        ],
      },
    },
  ],
};
