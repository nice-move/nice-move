'use strict';

module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    './lib/scss.json',
    './lib/order.js'
  ],
  plugins: [
    'stylelint-high-performance-animation',
    'stylelint-no-unsupported-browser-features'
  ],
  rules: {
    'at-rule-blacklist': ['debug'],
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-same-name-blockless', 'first-nested'],
        ignore: ['after-comment'],
        ignoreAtRules: ['else'],
        severity: 'warning'
      }
    ],
    'at-rule-no-unknown': null,
    'at-rule-no-vendor-prefix': true,
    'color-named': null,
    'function-url-quotes': 'always',
    'max-nesting-depth': 5,
    'media-feature-name-no-vendor-prefix': true,
    'plugin/no-low-performance-animation-properties': [
      true,
      { severity: 'warning' }
    ],
    'plugin/no-unsupported-browser-features': [
      true,
      {
        ignore: ['css-resize'],
        severity: 'warning'
      }
    ],
    'property-no-vendor-prefix': true,
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
        severity: 'warning'
      }
    ],
    'selector-max-compound-selectors': 5,
    'selector-no-qualifying-type': true,
    'selector-no-vendor-prefix': true,
    'selector-pseudo-element-colon-notation': 'double',
    'shorthand-property-no-redundant-values': true,
    'value-no-vendor-prefix': true
  }
};
