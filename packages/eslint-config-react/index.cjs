'use strict';

const { extends: roots } = require('@nice-move/eslint-config-base');

const { getPkg } = require('settingz');

function getConfig() {
  const { 'jsx-runtime': runtime = true } = getPkg('nice-move');
  return runtime;
}

module.exports = {
  extends: ['@nice-move/eslint-config-base'],
  overrides: [
    {
      files: ['*.tsx', '*.jsx'],
      extends: [
        'airbnb',
        'airbnb/hooks',
        ...(getConfig() ? ['plugin:react/jsx-runtime'] : []),
        ...roots.filter(
          (item) => !['eslint:recommended', 'airbnb-base'].includes(item),
        ),
        require.resolve('./lib/react.cjs'),
      ],
    },
  ],
};
