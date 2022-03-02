'use strict';

module.exports = {
  env: {
    browser: true,
    commonjs: false,
    es2022: true,
    es2021: true,
    es2020: true,
    es2019: true,
    es2018: true,
    es2017: true,
    es2016: true,
    node: false,
  },
  extends: ['plugin:sonarjs/recommended'],
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
  parserOptions: {
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: true,
      jsx: false,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['eslint-comments'],
  rules: {
    'eslint-comments/no-unused-enable': 'warn',
    'array-callback-return': [
      'error',
      {
        allowImplicit: true,
        checkForEach: true,
      },
    ],
    'arrow-body-style': 0,
    camelcase: 0,
    'class-methods-use-this': 'warn',
    'consistent-return': 'warn',
    'global-require': 0,
    'grouped-accessor-pairs': 0,
    'lines-between-class-members': 0,
    'max-classes-per-file': 0,
    'no-await-in-loop': 0,
    'no-console': 0,
    'no-constructor-return': 0,
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
      {
        ignorePropertyModificationsFor: [],
        props: true,
      },
    ],
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
    'no-plusplus': 0,
    'no-template-curly-in-string': 0,
    'no-undef-init': 0,
    'no-underscore-dangle': 0,
    'no-unreachable-loop': 0,
    'no-unused-expressions': [
      'error',
      {
        allowTaggedTemplates: true,
      },
    ],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_+$',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_+$',
      },
    ],
    'no-useless-rename': 0,
    'object-shorthand': 0,
    'prefer-arrow-callback': 'warn',
    'prefer-exponentiation-operator': 0,
    'prefer-template': 'warn',
    'sonarjs/cognitive-complexity': 0,
    'sonarjs/no-duplicate-string': 0,
    'sonarjs/no-identical-functions': 0,
    'spaced-comment': 0,
  },
};
