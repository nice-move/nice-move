'use strict';

const { AT_RULE_NO_UNKNOWN } = require('./utils.cjs');

module.exports = {
  rules: {
    'at-rule-no-unknown': AT_RULE_NO_UNKNOWN,
    'declaration-block-no-redundant-longhand-properties': [
      true,
      { severity: 'warning' },
    ],
    'font-family-name-quotes': 'always-where-recommended',
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
    'function-url-quotes': 'always',
    'max-nesting-depth': [5, { severity: 'warning' }],
    'no-duplicate-selectors': [true, { severity: 'warning' }],
    'number-max-precision': [4, { severity: 'warning' }],
    'selector-max-compound-selectors': [5, { severity: 'warning' }],
    'selector-max-universal': 1,
    'selector-no-qualifying-type': true,
    'selector-type-no-unknown': true,
    'time-min-milliseconds': 250,

    // ---- off --------------------
    'custom-media-pattern': null,
    'custom-property-pattern': null,
    'keyframes-name-pattern': null,
    'selector-class-pattern': null,
    'selector-id-pattern': null,

    // ---- handle by prettier -----
    'function-whitespace-after': null,

    // ---- handle by garou --------
    'alpha-value-notation': null,
    'at-rule-empty-line-before': null,
    'at-rule-no-vendor-prefix': null,
    'color-function-notation': null,
    'color-hex-length': null,
    'comment-empty-line-before': null,
    'comment-whitespace-inside': null,
    'custom-property-empty-line-before': null,
    'declaration-empty-line-before': null,
    'function-calc-no-unspaced-operator': null,
    'function-name-case': null,
    'hue-degree-notation': null,
    'length-zero-no-unit': null,
    'media-feature-name-no-vendor-prefix': null,
    'media-feature-range-operator-space-after': null,
    'media-feature-range-operator-space-before': null,
    'property-no-vendor-prefix': null,
    'rule-empty-line-before': null,
    'selector-no-vendor-prefix': null,
    'selector-pseudo-element-colon-notation': null,
    'selector-type-case': null,
    'shorthand-property-no-redundant-values': null,
    'value-keyword-case': null,
    'value-no-vendor-prefix': null,
  },
};
