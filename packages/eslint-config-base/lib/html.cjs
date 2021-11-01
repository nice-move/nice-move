'use strict';

module.exports = {
  overrides: [
    {
      files: ['*.html', '*.htm', '*.svg'],
      plugins: ['html'],
      settings: {
        'html/html-extensions': ['.html', '.htm', '.svg'],
      },
    },
  ],
};
