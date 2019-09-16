'use strict';

const { resolve } = require('path');

const loose = {
  severity: 'warning'
};

module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    resolve(__dirname, './lib/other.js'),
    resolve(__dirname, './lib/prefix.json'),
    resolve(__dirname, './lib/scss.js'),
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
    'declaration-block-no-redundant-longhand-properties': [true, loose],
    'font-family-name-quotes': 'always-where-required',
    'function-url-quotes': 'always',
    'max-nesting-depth': 5,
    'number-max-precision': 3,
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
        ...loose
      }
    ],
    'selector-max-compound-selectors': 5,
    'selector-max-universal': 1,
    'selector-no-qualifying-type': true,
    'selector-pseudo-element-colon-notation': ['double', loose],
    'shorthand-property-no-redundant-values': [true, loose],
    'time-min-milliseconds': 250,
    // TODO: 'unicode-bom': 'never',
    'value-keyword-case': ['lower', loose]
  }
};
