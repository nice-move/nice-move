const { resolve } = require('path');

module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-css-modules',
    resolve(__dirname, './lib/prefix.json'),
    resolve(__dirname, './lib/scss.js'),
    resolve(__dirname, './lib/order.js'),
    resolve(__dirname, './lib/ignore.js'),
  ],
  plugins: ['stylelint-declaration-block-no-ignored-properties'],
  rules: {
    'plugin/declaration-block-no-ignored-properties': true,
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-same-name-blockless', 'first-nested'],
        ignore: ['after-comment'],
        ignoreAtRules: ['else'],
        severity: 'warning',
      },
    ],
    'color-hex-length': null,
    'declaration-block-no-redundant-longhand-properties': true,
    'font-family-name-quotes': 'always-where-required',
    'function-url-quotes': 'always',
    'max-nesting-depth': 5,
    'number-max-precision': 4,
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
        severity: 'warning',
      },
    ],
    'selector-max-compound-selectors': 5,
    'selector-max-universal': 1,
    'selector-no-qualifying-type': true,
    'selector-pseudo-element-colon-notation': 'double',
    'shorthand-property-no-redundant-values': true,
    'time-min-milliseconds': 250,
  },
};
