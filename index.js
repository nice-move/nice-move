"use strict";

module.exports = {
  extends: ["./stylelint-order.json", "stylelint-config-standard"],
  plugins: ["stylelint-order", "stylelint-scss"],
  rules: {
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "at-rule-empty-line-before": [
      "always",
      {
        ignoreAtRules: ["else", "import"]
      }
    ],
    "block-closing-brace-newline-after": [
      "always",
      {
        ignoreAtRules: ["if"]
      }
    ],
    "declaration-colon-newline-after": null,
    "property-no-vendor-prefix": true,
    "scss/declaration-nested-properties": "never",
    "selector-pseudo-element-colon-notation": "double",
    "value-no-vendor-prefix": true,
    "value-list-comma-newline-after": null
  }
};
