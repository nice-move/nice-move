import eslintPluginUnicorn from 'eslint-plugin-unicorn';

const files = ['**/*.{js,jsx,ts,tsx,mjs,mts,cjs,cts,qs,wxs,vue,html,htm}'];

export default [
  {
    files,
    ...eslintPluginUnicorn.configs.recommended,
  },
  {
    files,
    rules: {
      'unicorn/consistent-destructuring': 'off',
      'unicorn/custom-error-definition': 'warn',
      'unicorn/expiring-todo-comments': 'off',
      'unicorn/import-style': 'off',
      'unicorn/no-for-each': 'off',
      'unicorn/prefer-await': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-useless-undefined': 'off',
      'unicorn/numeric-separators-style': [
        'warn',
        { onlyIfContainsSeparator: true },
      ],
      'unicorn/prefer-export-from': ['error', { checkUsedVariables: false }],
      'unicorn/prefer-global-this': 0,
      'unicorn/prefer-prototype-methods': 'off',
      'unicorn/prefer-set-has': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/name-replacements': 'off',
      'unicorn/relative-url-style': ['error', 'always'],
      'unicorn/require-post-message-target-origin': 'off',
      'unicorn/template-indent': 'off',
    },
  },
];
