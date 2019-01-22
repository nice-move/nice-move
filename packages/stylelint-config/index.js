module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-sass-guidelines',
    './stylelint-order.json'
  ],
  rules: {
    'at-rule-empty-line-before': [
      'always',
      {
        ignoreAtRules: ['else', 'import']
      }
    ],
    'block-closing-brace-newline-after': [
      'always',
      {
        ignoreAtRules: ['if']
      }
    ],
    'color-named': null,
    'declaration-colon-newline-after': null,
    'declaration-property-value-blacklist': null,
    'max-nesting-depth': 3,
    'order/properties-alphabetical-order': null,
    'scss/at-import-partial-extension-blacklist': null,
    'scss/declaration-nested-properties': 'never',
    'selector-no-qualifying-type': null,
    'value-list-comma-newline-after': null
  }
};
