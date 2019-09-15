'use strict';

const { resolve } = require('path');

const loose = {
  severity: 'warning'
};

module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    resolve(__dirname, './prefix.json'),
    resolve(__dirname, './other.js'),
    resolve(__dirname, './order.js')
  ],
  rules: {
    'function-url-quotes': 'always',
    'max-nesting-depth': 5,
    'selector-max-compound-selectors': 5,
    'selector-no-qualifying-type': true,
    'selector-pseudo-element-colon-notation': ['double', loose],
    'shorthand-property-no-redundant-values': [true, loose],
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
        ...loose
      }
    ]
  }
};
