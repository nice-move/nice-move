'use strict';

const { FUNCTION_NO_UNKNOWN, AT_RULE_NO_UNKNOWN } = require('./utils.cjs');

module.exports = {
  rules: {
    'selector-disallowed-list': [/,\s*?,/, /^\s*,\s*/],
    'declaration-block-no-redundant-longhand-properties': [
      true,
      { severity: 'warning' },
    ],
    'font-family-no-missing-generic-family-keyword': [
      true,
      {
        ignoreFontFamilies: [
          /^icon-/,
          /^iconfont-/,
          /^icon-font-/,
          /^fonticon-/,
          /^font-icon-/,
        ],
      },
    ],
    'at-rule-no-unknown': AT_RULE_NO_UNKNOWN,
    'declaration-property-value-no-unknown': true,
    'font-family-name-quotes': 'always-where-recommended',
    'function-no-unknown': FUNCTION_NO_UNKNOWN,
    'function-url-quotes': 'always',
    'max-nesting-depth': [5, { severity: 'warning' }],
    'no-duplicate-selectors': [true, { severity: 'warning' }],
    'number-max-precision': [4, { severity: 'warning' }],
    'selector-max-compound-selectors': [5, { severity: 'warning' }],
    'selector-max-universal': 1,
    'selector-no-qualifying-type': true,
    'time-min-milliseconds': 200,

    // ---- off --------------------
    'comment-no-empty': null,
    'custom-media-pattern': null,
    'custom-property-pattern': null,
    'keyframes-name-pattern': null,
    'selector-class-pattern': null,
    'selector-id-pattern': null,
  },
};
