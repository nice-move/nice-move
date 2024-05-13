'use strict';

const { AT_RULE_NO_UNKNOWN, FUNCTION_NO_UNKNOWN } = require('./utils.cjs');

const loose = {
  severity: 'warning',
};

module.exports = {
  rules: {
    'annotation-no-unknown': null,
    'at-rule-no-unknown': null,
    'comment-no-empty': null,
    'function-no-unknown': null,
    'no-invalid-position-at-import-rule': [
      true,
      {
        ignoreAtRules: ['use', 'forward'],
      },
    ],
    'scss/at-extend-no-missing-placeholder': true,
    'scss/at-if-no-null': true,
    'scss/at-import-partial-extension': 'always',
    'scss/at-mixin-argumentless-call-parentheses': 'always',
    'scss/at-rule-conditional-no-parentheses': true,
    'scss/at-rule-no-unknown': AT_RULE_NO_UNKNOWN,
    'scss/comment-no-empty': true,
    'scss/declaration-nested-properties': 'never',
    'scss/dimension-no-non-numeric-values': true,
    'scss/dollar-variable-default': [true, { ...loose, ignore: 'local' }],
    'scss/dollar-variable-no-missing-interpolation': true,
    'scss/function-quote-no-quoted-strings-inside': true,
    'scss/function-unquote-no-unquoted-strings-inside': true,
    'scss/no-duplicate-dollar-variables': [
      true,
      {
        ignoreInside: ['at-rule', 'nested-at-rule'],
      },
    ],
    'scss/no-duplicate-mixins': true,
    'scss/no-global-function-names': true,
    'scss/function-no-unknown': FUNCTION_NO_UNKNOWN,
    'scss/selector-no-redundant-nesting-selector': true,

    // off -------------
    'scss/at-import-no-partial-leading-underscore': null,
    'scss/declaration-nested-properties-no-divided-groups': null,

    // ---- handle by prettier -----
    'scss/at-else-closing-brace-newline-after': null,
    'scss/at-else-closing-brace-space-after': null,
    'scss/at-else-empty-line-before': null,
    'scss/at-else-if-parentheses-space-before': null,
    'scss/at-function-parentheses-space-before': null,
    'scss/at-if-closing-brace-newline-after': null,
    'scss/at-if-closing-brace-space-after': null,
    'scss/at-mixin-parentheses-space-before': null,
    'scss/dollar-variable-colon-newline-after': null,
    'scss/dollar-variable-colon-space-after': null,
    'scss/dollar-variable-colon-space-before': null,
    'scss/operator-no-newline-after': null,
    'scss/operator-no-newline-before': null,
    'scss/operator-no-unspaced': null,
  },
};
