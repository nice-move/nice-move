'use strict';

const { isReachable, haveLocalDependencies } = require('settingz');

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

const AT_RULE_NO_UNKNOWN = haveLocalDependencies('tailwindcss')
  ? [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'layer',
          'variants',
          'responsive',
          'screen',
        ],
      },
    ]
  : true;

module.exports = {
  isMiniApp,
  AT_RULE_NO_UNKNOWN,
};
