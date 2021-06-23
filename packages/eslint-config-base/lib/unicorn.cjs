'use strict';

module.exports = {
  extends: ['plugin:unicorn/recommended'],
  rules: {
    'unicorn/consistent-destructuring': 'off',
    'unicorn/custom-error-definition': 'warn',
    'unicorn/expiring-todo-comments': 'off',
    'unicorn/import-style': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/numeric-separators-style': [
      'warn',
      { onlyIfContainsSeparator: true },
    ],
    'unicorn/prefer-node-protocol': 'off',
    'unicorn/prefer-prototype-methods': 'off',
    'unicorn/prefer-set-has': 'off',
    'unicorn/prevent-abbreviations': 'off',
  },
  overrides: [
    {
      files: '*.cjs',
      rules: {
        'unicorn/prefer-module': 'off',
      },
    },
  ],
};
