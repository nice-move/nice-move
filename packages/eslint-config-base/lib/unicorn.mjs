import eslintPluginUnicorn from 'eslint-plugin-unicorn';

export default [
  eslintPluginUnicorn.configs['flat/recommended'],
  {
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
      'unicorn/prefer-global-this': 0,
      'unicorn/prefer-prototype-methods': 'off',
      'unicorn/prefer-set-has': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/relative-url-style': ['error', 'always'],
      'unicorn/require-post-message-target-origin': 'off',
      'unicorn/template-indent': 'off',
    },
  },
];
