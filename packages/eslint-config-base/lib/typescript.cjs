'use strict';

const {
  overrides: [{ rules: base }],
} = require('@typescript-eslint/eslint-plugin/dist/configs/eslint-recommended.js');
const {
  rules,
} = require('@typescript-eslint/eslint-plugin/dist/configs/recommended.js');

function filter(object, filter) {
  return Object.fromEntries(Object.entries(object).filter(filter));
}

module.exports = {
  overrides: [
    {
      files: '*.ts',
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
        ...filter(base, ([_, value]) => value !== 'off' && value !== 0),
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
