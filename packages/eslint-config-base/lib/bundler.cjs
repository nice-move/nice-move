'use strict';

const {
  matches: { source },
} = require('./utils.cjs');
const { isReachable } = require('settingz');

function webpack() {
  return isReachable('webpack/package.json') ||
    isReachable('best-shot/package.json')
    ? [
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
