'use strict';

const {
  matches: { source, sourceAndPackages },
} = require('./utils.cjs');
const { isReachable } = require('settingz');

function webpack() {
  return isReachable('webpack/package.json')
    ? [
        {
          files: sourceAndPackages,
          excludedFiles: ['*.mjs', '*.cjs', '*.html', '*.htm'],
          globals: {
            __resourceAndPackagesQuery: 'readonly',
            __non_webpack_require__: 'readonly',
            module: 'readonly',
            require: 'readonly',
          },
          rules: {
            'import/no-commonjs': 'warn',
          },
        },
        {
          files: sourceAndPackages,
          excludedFiles: ['*.html', '*.htm'],
          globals: {
            __dirname: 'readonly',
            __filename: 'readonly',
          },
        },
        {
          files: source,
          excludedFiles: ['*.html', '*.htm'],
          globals: {
            __webpack_public_path__: true,
            __webpack_base_uri__: true,
          },
        },
      ]
    : [];
}

module.exports = {
  overrides: webpack(),
};
