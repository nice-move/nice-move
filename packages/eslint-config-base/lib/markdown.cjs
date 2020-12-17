const {
  configs: {
    recommended: {
      overrides: [{ rules }],
    },
  },
} = require('eslint-plugin-markdown/lib/index');

module.exports = {
  plugins: ['markdown'],
  overrides: [
    {
      files: '*.md',
      processor: 'markdown/markdown',
    },
    {
      files: '**/*.md/*.{js,javascript,jsx,vue,html}',
      rules: {
        ...rules,
        'import/no-extraneous-dependencies': 'off',
        'import/no-unresolved': 'off',
        'unicorn/filename-case': 'off',
      },
    },
  ],
};
