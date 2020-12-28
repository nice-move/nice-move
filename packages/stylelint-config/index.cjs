module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-css-modules',
    require.resolve('./lib/prefix.json'),
    require.resolve('./lib/scss.cjs'),
    require.resolve('./lib/ignore.cjs'),
  ],
  plugins: ['stylelint-declaration-block-no-ignored-properties'],
  rules: {
    'plugin/declaration-block-no-ignored-properties': true,
    'color-hex-length': null,
    'declaration-block-no-redundant-longhand-properties': true,
    'font-family-name-quotes': 'always-where-recommended',
    'function-url-quotes': 'always',
    'max-nesting-depth': 5,
    'number-max-precision': 4,
    'selector-max-compound-selectors': 5,
    'selector-max-universal': 1,
    'selector-no-qualifying-type': true,
    'time-min-milliseconds': 250,
  },
};
