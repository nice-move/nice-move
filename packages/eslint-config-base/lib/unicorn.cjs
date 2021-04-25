module.exports = {
  extends: ['plugin:unicorn/recommended'],
  rules: {
    'unicorn/consistent-destructuring': 'off',
    'unicorn/expiring-todo-comments': 'off',
    'unicorn/import-index': ['warn', { ignoreImports: true }],
    'unicorn/import-style': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/prefer-node-protocol': 'off',
    'unicorn/prefer-set-has': 'off',
    'unicorn/prevent-abbreviations': 'off',
  },
};
