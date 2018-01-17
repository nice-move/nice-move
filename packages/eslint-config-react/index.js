const all = require('@nice-move/eslint-config-base');

module.exports = {
  ...all,
  overrides: [
    {
      files: '{src,packages/*}/**/*.jsx',
      extends: [
        'airbnb',
        'airbnb/hooks',
        'prettier',
        'prettier/unicorn',
        'prettier/react',
        '@nice-move/eslint-config-base/lib/base',
        '@nice-move/eslint-config-base/lib/import',
        require.resolve('./lib/react'),
      ],
    },
    {
      files: '{src,packages/*}/**/*.{,m,c}js',
      extends: [require.resolve('./lib/babel.js')],
    },
  ],
};
