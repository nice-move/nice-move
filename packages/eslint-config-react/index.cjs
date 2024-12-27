'use strict';

const { extends: roots } = require('@nice-move/eslint-config-base');

module.exports = {
  extends: ['@nice-move/eslint-config-base'],
  overrides: [
    {
      files: ['**/*.tsx', '**/*.jsx'],
      extends: [
        'airbnb',
        'plugin:react/jsx-runtime',
        ...roots.filter(
          (item) => !['eslint:recommended', 'airbnb-base'].includes(item),
        ),
        require.resolve('./lib/react.cjs'),
      ],
    },
    {
      files: [
        '**/*.ts',
        '**/*.js',
        '**/*.mts',
        '**/*.mjs',
        '**/*.tsx',
        '**/*.jsx',
      ],
      extends: ['airbnb/hooks'],
    },
    {
      files: ['**/*.md/*'],
      rules: {
        'react/react-in-jsx-scope': 'off',
      },
    },
  ],
};
