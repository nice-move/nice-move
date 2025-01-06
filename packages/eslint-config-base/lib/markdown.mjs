import markdown from 'eslint-plugin-markdown';

import { getGlobals } from './utils.mjs';

export default [
  {
    files: ['**/*.md'],
    name: 'markdown/recommended/plugin',
    plugins: {
      markdown,
    },
  },
  {
    name: 'markdown/recommended/processor',
    files: ['**/*.md'],
    processor: 'markdown/markdown',
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...getGlobals(),
      },
    },
  },
  {
    files: ['**/*.md/**'],
    // plugins: {
    //   markdown,
    // },
    rules: {
      strict: 'off',
      'eol-last': 'off',
      'no-undef': 'off',
      'no-unused-expressions': 'off',
      'no-unused-vars': 'off',
      'unicode-bom': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/no-unresolved': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/custom-error-definition': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
    },
  },
];
