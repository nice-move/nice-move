'use strict';

const { isMiniApp } = require('./lib/utils.cjs');

module.exports = {
  reportNeedlessDisables: true,
  reportInvalidScopeDisables: true,
  extends: [
    require.resolve('stylelint-config-standard'),
    require.resolve('./lib/ignore.cjs'),
    require.resolve('./lib/base.cjs'),
    require.resolve('stylelint-config-prettier'),
  ],
  plugins: ['stylelint-declaration-block-no-ignored-properties'],
  rules: {
    'plugin/declaration-block-no-ignored-properties': true,
    ...isMiniApp({
      'selector-type-no-unknown': [true, { ignoreTypes: ['page'] }],
      'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
      'selector-disallowed-list': ['*', /^(?!page)[A-Za-z]+$/, /[/:\\]/],
    }),
  },
  overrides: [
    {
      files: ['**/*.scss'],
      extends: [
        require.resolve('stylelint-config-recommended-scss'),
        require.resolve('./lib/ignore.cjs'),
        require.resolve('./lib/scss.cjs'),
        require.resolve('./lib/base.cjs'),
        require.resolve('stylelint-config-prettier'),
        require.resolve('stylelint-config-prettier-scss'),
      ],
      rules: {
        'at-rule-no-unknown': null,
      },
    },
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less',
    },
    {
      files: ['**/*.{html,htm,svg,vue}'],
      customSyntax: 'postcss-html',
      rules: {
        'at-rule-no-unknown': null,
        'no-empty-source': null,
      },
    },
    {
      files: ['**/*.md'],
      customSyntax: 'postcss-markdown',
      rules: {
        'at-rule-no-unknown': null,
        'no-empty-source': null,
      },
    },
    {
      files: ['**/*.vue', '**/*.module.*'],
      rules: {
        'property-no-unknown': [true, { ignoreSelectors: [':export'] }],
        'selector-pseudo-class-no-unknown': [
          true,
          { ignorePseudoClasses: ['export', 'global', 'local'] },
        ],
      },
    },
  ],
};
