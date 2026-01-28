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
      ...markdown.configs.recommended[0].rules,
      'markdown/no-html': 'warn',
    },
  },
  {
    files: ['**/*.md/*.{ts,js,mts,mjs,cts,cjs,tsx,jsx,vue,qs,wxs,html,htm}'],
    rules: {
      strict: 'off',
      '@typescript-eslint/no-deprecated': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'eol-last': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/no-unresolved': 'off',
      'n/no-missing-require': 'off',
      'no-undef': 'off',
      'no-unused-expressions': 'off',
      'no-unused-vars': 'off',
      'unicode-bom': 'off',
      'unicorn/custom-error-definition': 'off',
      'unicorn/filename-case': 'off',
    },
  },
];
