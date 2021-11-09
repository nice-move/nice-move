'use strict';

const { join } = require('path');

function BestShot() {
  try {
    const {
      git = [],
      stylelint = git,
      // eslint-disable-next-line import/no-unresolved
    } = require('@best-shot/cli/config/ignore.json');
    return stylelint;
  } catch {
    return [];
  }
}

module.exports = {
  ignoreFiles: [
    '**/*.min.*',
    '**/dist/*',
    '**/.(cache|svn|git)/*',
    ...BestShot(),
  ].map((item) => join(process.cwd(), item)),
};
