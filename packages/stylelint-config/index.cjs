'use strict';

const { hasConfig } = require('./lib/utils.cjs');

module.exports = {
  reportNeedlessDisables: true,
  reportInvalidScopeDisables: true,
  extends: [
    require.resolve('stylelint-config-standard'),
    require.resolve('stylelint-config-prettier'),
    require.resolve('stylelint-config-css-modules'),
    require.resolve('./lib/prefix.json'),
    require.resolve('./lib/scss.cjs'),
    require.resolve('./lib/ignore.cjs'),
  ],
  plugins: [
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-selector-no-empty',
    'stylelint-suitcss',
  ],
  rules: {
    'suitcss/custom-property-no-outside-root': true,
    'suitcss/root-no-standard-properties': true,
    'suitcss/selector-root-no-composition': true,
    'color-hex-length': null,
    'declaration-block-no-redundant-longhand-properties': true,
    'font-family-name-quotes': 'always-where-recommended',
    'function-url-quotes': 'always',
    'max-nesting-depth': 5,
    'number-max-precision': 4,
    'plugin/declaration-block-no-ignored-properties': true,
    'plugin/stylelint-selector-no-empty': true,
    'selector-max-compound-selectors': 5,
    'selector-max-universal': 1,
    'selector-no-qualifying-type': true,
    'shorthand-property-no-redundant-values': true,
    'time-min-milliseconds': 250,
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
    'selector-pseudo-element-colon-notation': [
      'double',
      { severity: 'warning' },
    ],
    'selector-type-no-unknown': true,
    ...hasConfig({
      'selector-type-no-unknown': [true, { ignoreTypes: ['page'] }],
      'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    }),
    // ---- handle by prettier -------------
    'at-rule-name-space-after': null,
    'at-rule-semicolon-space-before': null,
    'comment-whitespace-inside': null,
    'declaration-bang-space-after': null,
    'declaration-bang-space-before': null,
    'function-whitespace-after': null,
    'media-feature-colon-space-after': null,
    'media-feature-colon-space-before': null,
    'media-feature-parentheses-space-inside': null,
    'media-feature-range-operator-space-after': null,
    'media-feature-range-operator-space-before': null,
    'selector-attribute-brackets-space-inside': null,
    'selector-attribute-operator-space-after': null,
    'selector-attribute-operator-space-before': null,
    'selector-pseudo-class-parentheses-space-inside': null,

    // ---- handle by garou -------------
    'comment-empty-line-before': null,
    'custom-property-empty-line-before': null,
    'declaration-empty-line-before': null,
  },
};
