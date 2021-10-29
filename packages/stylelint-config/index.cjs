'use strict';

const { hasConfig } = require('./lib/utils.cjs');

module.exports = {
  reportNeedlessDisables: true,
  reportInvalidScopeDisables: true,
  extends: [
    require.resolve('stylelint-config-standard'),
    require.resolve('./lib/ignore.cjs'),
    require.resolve('./lib/base.cjs'),
    require.resolve('stylelint-config-css-modules'),
    require.resolve('stylelint-config-prettier'),
  ],
  // plugins: [
  //   'stylelint-declaration-block-no-ignored-properties',
  // ],
  rules: {
    // 'plugin/declaration-block-no-ignored-properties': true,

    'selector-disallowed-list': [/,\s*?,/, /^\s*,\s*/],

    ...hasConfig({
      'selector-type-no-unknown': [true, { ignoreTypes: ['page'] }],
      'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    }),
  },
  overrides: [
    {
      files: ['**/*.scss'],
      extends: [
        require.resolve('stylelint-config-standard-scss'),
        require.resolve('./lib/scss.cjs'),
        require.resolve('stylelint-config-css-modules'),
        require.resolve('stylelint-config-prettier'),
      ],
    },
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less',
    },
    {
      files: ['**/*.{html,htm,svg,vue}'],
      customSyntax: 'postcss-html',
    },
    {
      files: ['**/*.md'],
      customSyntax: 'postcss-markdown',
    },
  ],
};
