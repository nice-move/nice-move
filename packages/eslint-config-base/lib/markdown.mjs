import markdown from '@eslint/markdown';

export default [
  {
    files: ['**/*.md'],
    plugins: {
      markdown,
    },
    language: 'markdown/gfm',
    processor: 'markdown/markdown',
    languageOptions: {
      frontmatter: 'yaml',
    },
    rules: {
      'markdown/no-html': 'warn',
    },
  },
  {
    files: ['**/*.md/**/*.*'],
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
