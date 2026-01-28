import { FlatCompat } from '@eslint/eslintrc';
import base from '@nice-move/eslint-config-base';
import { getGlobals } from '@nice-move/eslint-config-base/lib/utils.mjs';
import prettier from 'eslint-config-prettier';
import pluginVue from 'eslint-plugin-vue';
import { getPkg } from 'settingz';

const version = '3.5.17';

const { isMiniApp } = getPkg('nice-move');

const compat = new FlatCompat({
  baseDirectory: import.meta.__dirname,
  resolvePluginsRelativeTo: import.meta.__dirname,
});

export default [
  ...base,
  ...pluginVue.configs['flat/recommended'].map((rule) => ({
    ...rule,
    files: ['**/*.vue'],
  })),
  {
    files: ['**/*.vue'],
    languageOptions: {
      ecmaVersion: 'latest',
      parserOptions: {
        ecmaFeatures: {
          globalReturn: false,
          impliedStrict: true,
          jsx: false,
        },
      },
      globals: {
        ...getGlobals({ es2025: true, browser: true }),
      },
    },
    rules: {
      'import/no-default-export': 0,
      'vue/attributes-order': 0,
      'vue/component-name-in-template-casing': ['warn', 'PascalCase'],
      'vue/component-tags-order': 0,
      'vue/multi-word-component-names': 0,
      'vue/no-duplicate-attr-inheritance': 'warn',
      'vue/no-empty-component-block': 'error',
      'vue/no-template-target-blank': ['error', { allowReferrer: true }],
      'vue/order-in-components': 0,
      'vue/require-name-property': 'warn',
      'vue/v-on-handler-style': 'warn',
      'vue/no-useless-mustaches': [
        'warn',
        {
          ignoreIncludesComment: true,
          ignoreStringEscape: true,
        },
      ],
      'vue/no-reserved-component-names': [
        'error',
        {
          disallowVueBuiltInComponents: true,
          disallowVue3BuiltInComponents: true,
        },
      ],
      ...(version
        ? { 'vue/no-unsupported-features': ['error', { version }] }
        : undefined),
      ...(isMiniApp
        ? {
            'vue/no-v-text-v-html-on-component': [
              'error',
              { allow: ['view', 'text'] },
            ],
          }
        : undefined),
    },
  },
  ...compat.config(prettier).map((rule) => ({
    ...rule,
    files: ['**/*.vue'],
  })),
];
