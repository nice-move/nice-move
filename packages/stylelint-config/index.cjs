'use strict';

const { isMiniApp, tailwind } = require('./lib/utils.cjs');

module.exports = {
  reportNeedlessDisables: true,
  reportInvalidScopeDisables: true,
  extends: [
    require.resolve('stylelint-config-standard'),
    require.resolve('./lib/ignore.cjs'),
    require.resolve('./lib/base.cjs'),
  ],
  plugins: [
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-no-unresolved-module',
  ],
  rules: {
    'plugin/declaration-block-no-ignored-properties': [
      true,
      { severity: 'warning' },
    ],
    'plugin/no-unresolved-module': {
      modules: ['node_modules'],
    },
    ...(tailwind
      ? {
          'at-rule-no-deprecated': [true, { ignoreAtRules: ['apply'] }],
          'declaration-property-value-no-unknown': [
            true,
            {
              ignoreProperties: {
                '/.+/': /theme\([.\w]+\)/.toString(),
              },
            },
          ],
        }
      : undefined),
  },
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: require('postcss-scss'),
      plugins: ['stylelint-scss'],
      extends: [require.resolve('./lib/scss.cjs')],
    },
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less',
      rules: {
        'function-no-unknown': null,
      },
    },
    {
      files: ['**/*.{html,htm,svg,vue}'],
      customSyntax: 'postcss-html',
      rules: {
        'no-empty-source': null,
      },
    },
    {
      files: ['**/*.vue'],
      rules: {
        'annotation-no-unknown': null,
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
    {
      files: ['**/*.*'],
      extends: [
        require.resolve('./lib/prettier.cjs'),
        require.resolve('./lib/garou.cjs'),
      ],
      rules:
        isMiniApp({
          'declaration-property-value-no-unknown': [
            true,
            {
              ignoreProperties: {
                '/.+/': tailwind
                  ? /\drpx|theme\([.\w]+\)/.toString()
                  : /\drpx/.toString(),
              },
            },
          ],
          'selector-type-no-unknown': [true, { ignoreTypes: ['page'] }],
          'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
          'selector-disallowed-list': ['*', /^(?!page)[A-Za-z]+$/, /[/\\]/],
        }) || {},
    },
  ],
};
