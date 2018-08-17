"use strict";

module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-sass-guidelines",
    "./stylelint-order.json"
  ],
  rules: {
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
    "scss/declaration-nested-properties": "never",
    "value-list-comma-newline-after": null
  }
};
