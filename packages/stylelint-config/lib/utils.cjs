'use strict';

const { isReachable, haveLocalDependencies } = require('settingz');

// eslint-disable-next-line consistent-return
function isMiniApp(value) {
  if (
    isReachable('./mini.project.json') ||
    isReachable('./project.alipay.json') ||
    isReachable('./project.config.json') ||
    isReachable('./project.swan.json')
  ) {
    return value;
  }
}

const tailwind = haveLocalDependencies('tailwindcss');

const AT_RULE_NO_UNKNOWN = tailwind
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

const FUNCTION_NO_UNKNOWN = tailwind
  ? [true, { ignoreFunctions: ['theme'] }]
  : true;

module.exports = {
  isMiniApp,
  AT_RULE_NO_UNKNOWN,
  FUNCTION_NO_UNKNOWN,
};
