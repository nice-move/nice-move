'use strict';

const { getPkg } = require('settingz');

function getVersion() {
  const { vue = '' } = getPkg('dependencies');

  return vue.replace(/^[^~]/, '');
}

const version = getVersion();

module.exports = {
  extends: ['@nice-move/eslint-config-base'],
  overrides: [
    {
      files: '*.vue',
      extends: [
        version[0] === '3'
          ? 'plugin:vue/vue3-recommended'
          : 'plugin:vue/recommended',
        'prettier',
      ],
      parserOptions: {
        ecmaVersion: 2022,
      },
      rules: {
        'vue/attributes-order': 0,
        'vue/component-name-in-template-casing': ['warn', 'PascalCase'],
        'vue/component-tags-order': 0,
        'vue/multi-word-component-names': 0,
        'vue/no-duplicate-attr-inheritance': 'warn',
        'vue/no-empty-component-block': 'error',
        'vue/no-template-target-blank': ['error', { allowReferrer: true }],
        'vue/no-v-for-template-key': 'warn',
        'vue/no-v-model-argument': 0,
        'vue/order-in-components': 0,
        'vue/padding-line-between-blocks': 0,
        'vue/require-name-property': 'warn',
        'vue/v-on-function-call': ['warn', 'never'],
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
      },
    },
  ],
};
