'use strict';

const { hasInstall } = require('./utils.cjs');

const loose = {
  severity: 'warning',
};

module.exports = {
  plugins: 'stylelint-scss',
  rules: {
    'at-rule-disallowed-list': ['debug', 'extend'],
    'scss/at-if-no-null': true,
    'scss/at-import-partial-extension': ['always', loose],
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': [
      true,
      hasInstall('tailwindcss/package.json', {
        ignoreAtRules: ['tailwind', 'layer'],
      }),
    ].filter(Boolean),
    'scss/declaration-nested-properties': 'never',
    'scss/dimension-no-non-numeric-values': true,
    'scss/dollar-variable-default': [true, { ...loose, ignore: 'local' }],
    'scss/function-quote-no-quoted-strings-inside': true,
    'scss/function-unquote-no-unquoted-strings-inside': true,
    'scss/no-duplicate-dollar-variables': [
      true,
      {
        ignoreInside: ['at-rule', 'nested-at-rule'],
      },
    ],
    'scss/no-global-function-names': true,
    'scss/at-mixin-argumentless-call-parentheses': [
      'never',
      {
        severity: 'warning',
      },
    ],
    'scss/at-rule-conditional-no-parentheses': [
      true,
      {
        severity: 'warning',
      },
    ],
    'scss/selector-no-redundant-nesting-selector': true,
  },
};
