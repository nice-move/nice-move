'use strict';

const { hasInstall } = require('./utils.cjs');

const loose = {
  severity: 'warning',
};

module.exports = {
  rules: {
    'scss/at-import-no-partial-leading-underscore': null,
    'scss/at-import-partial-extension': 'always',
    'scss/at-rule-no-unknown': [
      true,
      hasInstall('tailwindcss/package.json', {
        ignoreAtRules: ['tailwind', 'layer', 'apply'],
      }),
    ].filter(Boolean),
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
    'scss/at-function-pattern': null,
    'scss/at-mixin-pattern': null,
    'scss/dollar-variable-pattern': null,
    'scss/percent-placeholder-pattern': null,

    'scss/double-slash-comment-whitespace-inside': null,
    'scss/declaration-nested-properties-no-divided-groups': null,

    // prettier -----
    'scss/at-else-closing-brace-space-after': null,
    'scss/at-else-empty-line-before': null,
    'scss/at-else-if-parentheses-space-before': null,
    'scss/at-function-parentheses-space-before': null,
    'scss/at-if-closing-brace-space-after': null,
    'scss/at-mixin-parentheses-space-before': null,
    'scss/dollar-variable-colon-space-after': null,
    'scss/dollar-variable-colon-space-before': null,
    'scss/operator-no-newline-after': null,
    'scss/operator-no-newline-before': null,
    'scss/operator-no-unspaced': null,
    'scss/at-else-closing-brace-newline-after': null,
    'scss/at-if-closing-brace-newline-after': null,

    // garou -------------
    'scss/double-slash-comment-empty-line-before': null,
    'scss/dollar-variable-empty-line-before': null,
    'scss/at-rule-conditional-no-parentheses': null,
    'scss/at-mixin-argumentless-call-parentheses': null,
  },
};
