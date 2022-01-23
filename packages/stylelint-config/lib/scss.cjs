'use strict';

const { AT_RULE_NO_UNKNOWN } = require('./utils.cjs');

const loose = {
  severity: 'warning',
};

module.exports = {
  rules: {
    'scss/at-import-partial-extension': 'always',
    'scss/at-rule-no-unknown': AT_RULE_NO_UNKNOWN,
    'scss/declaration-nested-properties': 'never',
    'scss/dimension-no-non-numeric-values': true,
    'scss/dollar-variable-default': [true, { ...loose, ignore: 'local' }],
    'scss/no-duplicate-dollar-variables': [
      true,
      {
        ignoreInside: ['at-rule', 'nested-at-rule'],
      },
    ],
    'scss/selector-no-redundant-nesting-selector': true,

    // off -------------
    'scss/at-import-no-partial-leading-underscore': null,
    'scss/declaration-nested-properties-no-divided-groups': null,
  },
};
