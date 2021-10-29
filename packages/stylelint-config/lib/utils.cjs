'use strict';

const { resolve } = require('path');

function isSafeError(error) {
  return (
    error.code === 'MODULE_NOT_FOUND' && error.requireStack[0] === __filename
  );
}

function has(path) {
  try {
    require.resolve(path);
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
  if (has(resolve(process.cwd(), 'project.config.json'))) {
    return value;
  }
}

function hasInstall(moduleId, value) {
  if (has(moduleId)) {
    return value;
  }
  return true;
}

const AT_RULE_NO_UNKNOWN = hasInstall('tailwindcss/package.json', [
  true,
  { ignoreAtRules: ['tailwind', 'layer', 'apply'] },
]);

module.exports = {
  hasConfig,
  AT_RULE_NO_UNKNOWN,
};
