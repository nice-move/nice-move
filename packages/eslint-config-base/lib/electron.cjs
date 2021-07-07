'use strict';

const { pkgHas } = require('./utils.cjs');

module.exports =
  pkgHas(
    ({ devDependencies: { electron } = {} }) => electron,
    () => ({
      overrides: [
        {
          files: 'src/**',
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
