'use strict';

const { existThenReturn, safeGet } = require('./utils.cjs');

function BestShot() {
  return existThenReturn('@best-shot/preset-env/package.json', () => [
    {
      files: '{src,packages/*}/**',
      ...(safeGet('@best-shot/preset-env/eslint.cjs') ||
        safeGet('@best-shot/preset-env/eslint.js')),
    },
  ]);
}

function webpack() {
  return existThenReturn('webpack/package.json', () => [
    {
      files: '{src,packages/*}/**',
      excludedFiles: ['*.mjs', '*.cjs'],
      env: {
        commonjs: true,
      },
      globals: {
        __dirname: 'readonly',
        __filename: 'readonly',
      },
      rules: {
        'import/no-commonjs': 'warn',
      },
    },
    {
      files: 'src/**',
      globals: {
        __resourceQuery: 'readonly',
        __webpack_public_path__: 'readonly',
      },
    },
  ]);
}

module.exports = {
  overrides: [...(webpack() || []), ...(BestShot() || [])],
};
