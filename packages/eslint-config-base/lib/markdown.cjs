'use strict';

const {
  configs: {
    'recommended-legacy': {
      overrides: [_, { rules }],
    },
  },
} = require('eslint-plugin-markdown/lib/index');

module.exports = {
  overrides: [
    {
      files: '*.md',
      plugins: ['markdown'],
      processor: 'markdown/markdown',
    },
    {
      files: '**/*.md/*',
      rules: {
        ...rules,
        'import/no-extraneous-dependencies': 'off',
        'import/no-unresolved': 'off',
        'unicorn/filename-case': 'off',
        'unicorn/custom-error-definition': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-extraneous-class': 'off',
      },
    },
  ],
};
