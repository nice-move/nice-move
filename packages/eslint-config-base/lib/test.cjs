'use strict';

const { existThenReturn } = require('./utils.cjs');

module.exports = {
  overrides: [
    existThenReturn('eslint-plugin-ava/package.json', () => ({
      files: [
        '**/{test,tests,spec,specs}/*.{m,c,}js',
        '*.{test,spec}.{m,c,}js}',
      ],
      plugins: ['ava'],
      // eslint-disable-next-line import/no-extraneous-dependencies
      rules: require('eslint-plugin-ava/index.js').configs.recommended.rules,
    })),
  ].filter(Boolean),
};
