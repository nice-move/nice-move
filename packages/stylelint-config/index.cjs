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
  plugins: [
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-suitcss',
  ],
  rules: {
    'suitcss/root-no-standard-properties': true,
    'suitcss/selector-root-no-composition': true,

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
        'function-no-unknown': null,
      },
    },
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less',
      rules: {
        'function-no-unknown': [
          true,
          {
            ignoreFunctions: [
              /^(if|boolean|e|escape|%|replace|length|extract|range|each|ceil|floor|percentage|round|sqrt|abs|sin|asin|cos|acos|tan|atan|pi|pow|mod|min|max|isnumber|isstring|iscolor|iskeyword|isurl|ispixel|isem|ispercentage|isunit|isruleset|isdefined|color|image-size|image-width|image-height|convert|data-uri|default|unit|get-unit|svg-gradient|rgb|rgba|argb|hsl|hsla|hsv|hsva|hue|saturation|lightness|hsvhue|hsvsaturation|hsvvalue|red|green|blue|alpha|luma|luminance|saturate|desaturate|lighten|darken|fadein|fadeout|fade|spin|mix|tint|shade|greyscale|contrast|multiply|screen|overlay|softlight|hardlight|difference|exclusion|average|negation)$/,
            ],
          },
        ],
      },
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
