'use strict';

const { haveLocalDependencies, getPkg } = require('settingz');

// eslint-disable-next-line consistent-return
function isMiniApp(value) {
  if (getPkg('nice-move').isMiniApp) {
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
