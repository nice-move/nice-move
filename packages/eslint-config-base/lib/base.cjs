'use strict';

module.exports = {
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
      globalReturn: false,
      jsx: false,
    },
  },
  env: {
    browser: true,
    es2021: true,
    commonjs: false,
    node: false,
  },
  plugins: ['eslint-comments'],
  extends: ['plugin:sonarjs/recommended'],
  rules: {
    'sonarjs/cognitive-complexity': 0,
    'sonarjs/no-duplicate-string': 0,
    'sonarjs/no-identical-functions': 0,
    'array-callback-return': [
      'error',
      {
        allowImplicit: true,
        checkForEach: true,
      },
    ],
    'no-useless-rename': 0,
    'object-shorthand': 0,
    'arrow-body-style': 0,
    camelcase: 0,
    'class-methods-use-this': 'warn',
    'consistent-return': 'warn',
    'eslint-comments/no-unused-disable': 'warn',
    'eslint-comments/no-unused-enable': 'warn',
    'global-require': 0,
    'no-unreachable-loop': 0,
    'grouped-accessor-pairs': 0,
    'no-constructor-return': 0,
    'lines-between-class-members': 0,
    'max-classes-per-file': 0,
    'no-console': 0,
    'prefer-exponentiation-operator': 0,
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true,
      },
    ],
    'no-implicit-coercion': [
      'warn',
      {
        disallowTemplateShorthand: true,
      },
    ],
    'no-nested-ternary': 0,
    'no-param-reassign': [
      'warn',
      { props: true, ignorePropertyModificationsFor: [] },
    ],
    'no-plusplus': 'warn',
    'no-restricted-syntax': [
      'error',
      {
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
        selector: 'ForInStatement',
      },
      {
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
        selector: 'LabeledStatement',
      },
    ],
    'no-template-curly-in-string': 0,
    'no-undef-init': 0,
    'no-underscore-dangle': 0,
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_+$',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_+$',
      },
    ],
    'prefer-arrow-callback': 'warn',
    'prefer-template': 'warn',
    'spaced-comment': 0,
  },
  overrides: [
    {
      files: ['*.jsx', '*.tsx'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  ],
};
