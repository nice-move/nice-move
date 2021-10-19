'use strict';

module.exports = {
  rules: {
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

    // ---- handle by prettier -------------
    'function-whitespace-after': null,

    // ---- handle by garou -------------
    'at-rule-empty-line-before': null,
    'color-hex-length': null,
    'comment-empty-line-before': null,
    'comment-whitespace-inside': null,
    'custom-property-empty-line-before': null,
    'declaration-empty-line-before': null,
    'media-feature-range-operator-space-after': null,
    'media-feature-range-operator-space-before': null,
    'rule-empty-line-before': null,
    'selector-pseudo-element-colon-notation': null,
    // 'shorthand-property-no-redundant-values': null,
  },
};