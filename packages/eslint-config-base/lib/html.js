module.exports = {
  plugins: ['html'],
  settings: {
    'html/html-extensions': ['.html', '.htm'],
  },
  overrides: [
    {
      files: '**/*.{html,htm}',
      env: {
        browser: true,
        commonjs: false,
        node: false,
      },
    },
  ],
};
