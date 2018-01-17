module.exports = {
  extends: ['@nice-move/eslint-config-base'],
  overrides: [
    {
      files: '{src,packages/*}/**/*.vue',
      extends: [
        'plugin:vue/essential',
        'prettier/vue',
        require.resolve('./lib/vue.js'),
      ],
    },
    {
      files: '{src,packages/*}/**/*.{,m,c}js',
      extends: [require.resolve('./lib/babel.js')],
    },
  ],
};
