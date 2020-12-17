const all = require('@nice-move/eslint-config-base');

module.exports = {
  ...all,
  overrides: [
    {
      files: '{src,packages/*}/**/*.jsx',
      extends: [
        'airbnb',
        'airbnb/hooks',
        'prettier/react',
        '@nice-move/eslint-config-base/lib/import',
        require.resolve('./lib/react'),
        '@nice-move/eslint-config-base/lib/base',
        'prettier',
      ],
    },
    {
      files: '{src,packages/*}/**/*.{,m,c}js',
      extends: [require.resolve('./lib/babel.js')],
    },
  ],
};
