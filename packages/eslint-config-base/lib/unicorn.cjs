module.exports = {
  extends: ['plugin:unicorn/recommended', 'prettier/unicorn'],
  rules: {
    'unicorn/expiring-todo-comments': 'off',
    'unicorn/import-index': 'off',
    'unicorn/import-style': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-reduce': 'off',
    'unicorn/prefer-set-has': 'off',
    'unicorn/prevent-abbreviations': 'off',
  },
  overrides: [
    {
      files: '*.cjs',
      rules: {
        'unicorn/import-index': 'warn',
      },
    },
  ],
};
