import postcssScss from 'postcss-scss';

import { isMiniApp, tailwind } from './lib/utils.mjs';

export default {
  reportNeedlessDisables: true,
  reportInvalidScopeDisables: true,
  extends: [
    import.meta.resolve('stylelint-config-standard'),
    import.meta.resolve('./lib/ignore.mjs'),
    import.meta.resolve('./lib/base.mjs'),
  ],
  plugins: ['stylelint-declaration-block-no-ignored-properties'],
  rules: {
    'plugin/declaration-block-no-ignored-properties': [
      true,
      { severity: 'warning' },
    ],
    ...(tailwind && {
      'at-rule-no-deprecated': [
        true,
        { ignoreAtRules: ['apply', 'wv-keep-import'] },
      ],
      'declaration-property-value-no-unknown': [
        true,
        {
          ignoreProperties: {
            '/.+/': /theme\([.\w]+\)/.toString(),
          },
        },
      ],
    }),
  },
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: postcssScss,
      plugins: ['stylelint-scss'],
      extends: [import.meta.resolve('./lib/scss.mjs')],
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
        'function-no-unknown': null,
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
        import.meta.resolve('./lib/prettier.mjs'),
        import.meta.resolve('./lib/garou.mjs'),
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
          'selector-type-no-unknown': [
            true,
            { ignoreTypes: ['page', 'wx-button'] },
          ],
          'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
          'selector-disallowed-list': ['*', /^(?!page)[A-Za-z]+$/, /[/\\]/],
        }) || {},
    },
  ],
};
