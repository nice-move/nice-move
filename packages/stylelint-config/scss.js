'use strict';

const { resolve } = require('path');

const loose = {
  severity: 'warning'
};

module.exports = {
  extends: resolve(__dirname, './index.js'),
  plugins: 'stylelint-scss',
  rules: {
    'at-rule-blacklist': ['debug', 'extend'],
    'scss/at-if-no-null': [true, loose],
    'scss/at-import-partial-extension': ['always', loose],
    'scss/at-mixin-argumentless-call-parentheses': ['never', loose],
    'scss/at-rule-conditional-no-parentheses': [true, loose],
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'scss/declaration-nested-properties': 'never',
    'scss/dimension-no-non-numeric-values': true,
    'scss/dollar-variable-default': [
      true,
      {
        ignore: 'local',
        ...loose
      }
    ],
    'scss/function-quote-no-quoted-strings-inside': true,
    'scss/function-unquote-no-unquoted-strings-inside': true,
    'scss/no-duplicate-dollar-variables': [
      true,
      {
        ignoreInsideAtRules: ['if', 'else']
      }
    ],
    'scss/media-feature-value-dollar-variable': ['always', loose],
    'scss/selector-nest-combinators': ['always', loose],
    'scss/selector-no-redundant-nesting-selector': [true, loose]
  }
};
