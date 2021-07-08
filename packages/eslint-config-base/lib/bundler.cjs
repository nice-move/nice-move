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
      excludedFiles: ['*.mjs', '*.cjs', '*.html', '*.htm'],
      globals: {
        __dirname: 'readonly',
        __filename: 'readonly',
        __resourceQuery: 'readonly',
        __non_webpack_require__: 'readonly',
        __webpack_require__: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
      rules: {
        'import/no-commonjs': 'warn',
      },
    },
    {
      files: 'src/**',
      globals: {
        __webpack_runtime_id__: 'readonly',
        __webpack_public_path__: true,
        __webpack_base_uri__: true,
      },
    },
  ]);
}

module.exports = {
  overrides: [...(webpack() || []), ...(BestShot() || [])],
};
