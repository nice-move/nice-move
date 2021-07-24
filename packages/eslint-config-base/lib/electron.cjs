'use strict';

const {
  pkgHas,
  matches: { source },
} = require('./utils.cjs');

module.exports =
  pkgHas(
    ({ devDependencies: { electron } = {} }) => electron,
    () => ({
      overrides: [
        {
          files: source,
          settings: {
            'import/core-modules': ['electron'],
          },
          globals: {
            Buffer: 'readonly',
            clearImmediate: 'readonly',
            global: 'readonly',
            process: 'readonly',
            setImmediate: 'readonly',
          },
          rules: {
            'import/no-nodejs-modules': 'off',
          },
        },
      ],
    }),
  ) || {};
