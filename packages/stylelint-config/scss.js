'use strict';

const { resolve } = require('path');

const loose = {
  severity: 'warning'
};

module.exports = {
  plugins: [resolve(__dirname, './lib/base.js'), 'stylelint-scss'],
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
    'at-rule-blacklist': ['debug', 'extend'],
    'scss/at-if-no-null': [true, loose],
    'scss/at-import-partial-extension': ['always', loose],
    'scss/at-mixin-argumentless-call-parentheses': ['never', loose],
    'scss/at-rule-conditional-no-parentheses': [true, loose],

    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': [true, loose],

    'scss/declaration-nested-properties': 'never',
    'scss/dimension-no-non-numeric-values': true,
    'scss/dollar-variable-default': [
      true,
      {
        ignore: 'local',
        ...loose
      }
    ],
    'scss/dollar-variable-no-missing-interpolation': true,
    'scss/no-duplicate-dollar-variables': [
      true,
      {
        ignoreInsideAtRules: ['if', 'else']
      }
    ],
    'scss/media-feature-value-dollar-variable': 'always',
    'scss/selector-nest-combinators': ['always', loose],
    'scss/selector-no-redundant-nesting-selector': [true, loose]
  }
};
