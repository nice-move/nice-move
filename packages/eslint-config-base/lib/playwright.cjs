'use strict';

const { pkgHas } = require('./utils.cjs');

module.exports =
  pkgHas(
    ({ peerDependencies: { '@playwright/test': playwright } = {} }) =>
      playwright,
    () => ({
      overrides: [
        {
          files: 'test/**',
          settings: {
            'import/core-modules': ['@playwright/test'],
          },
        },
      ],
    }),
  ) || {};
