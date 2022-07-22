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
    'unicorn/numeric-separators-style': [
      'warn',
      { onlyIfContainsSeparator: true },
    ],
    'unicorn/prefer-export-from': ['error', { ignoreUsedVariables: true }],
    'unicorn/prefer-node-protocol': 'off',
    'unicorn/prefer-prototype-methods': 'off',
    'unicorn/prefer-set-has': 'off',
    'unicorn/prefer-top-level-await': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/require-post-message-target-origin': 'off',
    'unicorn/template-indent': 'off',
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
