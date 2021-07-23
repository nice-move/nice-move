'use strict';

const { resolve } = require('path');

function isSafeError(error) {
  return (
    error.code === 'MODULE_NOT_FOUND' && error.requireStack[0] === __filename
  );
}

function has() {
  try {
    require.resolve(resolve(process.cwd(), 'project.config.json'));
    return true;
  } catch (error) {
    if (isSafeError(error)) {
      return false;
    }
    throw error;
  }
}

// eslint-disable-next-line consistent-return
function hasConfig(value) {
  if (has()) {
    return value;
  }
}

module.exports = {
  hasConfig,
};
