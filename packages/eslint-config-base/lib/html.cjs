'use strict';

module.exports = {
  overrides: [
    {
      files: ['.html', '.htm'],
      plugins: ['html'],
      settings: {
        'html/html-extensions': ['.html', '.htm'],
      },
    },
  ],
};
