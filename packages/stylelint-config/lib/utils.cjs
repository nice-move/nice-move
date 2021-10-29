'use strict';

const { isReachable } = require('settingz');

// eslint-disable-next-line consistent-return
function isMiniApp(value) {
  if (
    isReachable('./project.config.json') ||
    isReachable('./project.swan.json') ||
    isReachable('./mini.config.json')
  ) {
    return value;
  }
}

const AT_RULE_NO_UNKNOWN = isReachable('tailwindcss/package.json')
  ? [true, { ignoreAtRules: ['tailwind', 'layer', 'apply'] }]
  : true;

module.exports = {
  isMiniApp,
  AT_RULE_NO_UNKNOWN,
};
