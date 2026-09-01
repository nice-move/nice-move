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
          'apply',
          'config',
          'custom-variant',
          'layer',
          'responsive',
          'screen',
          'source',
          'tailwind',
          'utility',
          'variants',
          'wv-keep-import',
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
