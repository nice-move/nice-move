'use strict';

const { resolve } = require('path');

const loose = {
  severity: 'warning'
};

module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    resolve(__dirname, './lib/prefix.json'),
    resolve(__dirname, './lib/other.js'),
    resolve(__dirname, './lib/order.js')
  ],
  rules: {
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-same-name-blockless', 'first-nested'],
        ignore: ['after-comment'],
        ignoreAtRules: ['else'],
        ...loose
      }
    ],
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
