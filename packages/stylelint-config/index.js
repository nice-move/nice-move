'use strict';

const { resolve } = require('path');

const loose = {
  severity: 'warning'
};

module.exports = {
  extends: resolve(__dirname, './lib/base.js'),
  rules: {
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-same-name-blockless', 'first-nested'],
        ignore: ['after-comment'],
        ...loose
      }
    ]
  }
};
