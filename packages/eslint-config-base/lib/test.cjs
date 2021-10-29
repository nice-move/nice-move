'use strict';

const { reaching } = require('settingz');

const { configs: { recommended: { rules } = {} } = {} } = reaching(
  'eslint-plugin-ava/index.js',
);

module.exports = {
  overrides: rules
    ? [
        {
          files: [
            '**/{test,tests,spec,specs}/*.{m,c,}js',
            '*.{test,spec}.{m,c,}js}',
          ],
          plugins: ['ava'],
          rules,
        },
      ]
    : [],
};
