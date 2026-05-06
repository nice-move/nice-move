'use strict';

const { haveLocalDependencies, getPkg } = require('settingz');

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
          'wv-keep-import',
          'apply',
          'custom-variant',
          'layer',
          'responsive',
          'screen',
          'source',
          'tailwind',
          'variants',
        ],
      },
    ]
  : true;

const FUNCTION_NO_UNKNOWN = tailwind
  ? [true, { ignoreFunctions: ['theme'] }]
  : true;

module.exports = {
  isMiniApp,
  tailwind,
  AT_RULE_NO_UNKNOWN,
  FUNCTION_NO_UNKNOWN,
};
