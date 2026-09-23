import { haveLocalDependencies, getPkg } from 'settingz';

export function isMiniApp(value) {
  if (getPkg('nice-move').isMiniApp) {
    return value;
  }
}

export const tailwind = haveLocalDependencies('tailwindcss');

export const AT_RULE_NO_UNKNOWN = tailwind
  ? [
      true,
      {
        ignoreAtRules: [
          'apply',
          'config',
          'custom-variant',
          'layer',
          'theme',
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

export const FUNCTION_NO_UNKNOWN = tailwind
  ? [true, { ignoreFunctions: ['theme'] }]
  : true;
