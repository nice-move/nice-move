const all = require('@nice-move/eslint-config-base');

module.exports = {
  ...all,
  overrides: [
    {
      files: '*.jsx',
      extends: [
        'airbnb',
        'airbnb/hooks',
        'prettier/react',
        '@nice-move/eslint-config-base/lib/import.cjs',
        require.resolve('./lib/react.cjs'),
        '@nice-move/eslint-config-base/lib/base.cjs',
        'prettier',
      ],
    },
    {
      files: '{src,packages/*}/**/*.{,m,c}js',
      extends: require.resolve('./lib/babel.cjs'),
    },
  ],
};
