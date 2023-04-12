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
            '**/{test,tests,spec,specs}/*.{m,c,}{j,t}s',
            '*.{test,spec}.{m,c,}{j,t}s}',
          ],
          plugins: ['ava'],
          rules: {
            ...rules,
            'unicorn/no-empty-file': 0,
          },
        },
      ]
    : [],
};
