'use strict';

const { getGlobals } = require('../lib/utils.cjs');

module.exports = {
  env: {
    es2025: true,
    browser: false,
    node: false,
    commonjs: false,
  },
  globals: getGlobals({ es2025: true }),
  parserOptions: {
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: true,
      jsx: false,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: ['plugin:@eslint-community/eslint-comments/recommended'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
      env: {
        es2025: true,
        browser: true,
        node: false,
        commonjs: false,
      },
      globals: getGlobals({ es2025: true, browser: true }),
    },
    {
      files: ['**/*.jsx', '**/*.tsx'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    {
      files: ['**/*.cjs'],
      parserOptions: {
        sourceType: 'script',
        ecmaFeatures: {
          impliedStrict: false,
        },
      },
    },
    {
      files: ['**/*.cts'],
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
          impliedStrict: true,
        },
      },
    },
  ],
  rules: {
    'lines-around-directive': 0,
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
    'no-constant-binary-expression': 'error',
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
    'no-restricted-exports': [
      'error',
      {
        restrictedNamedExports: ['then', 'await'],
      },
    ],
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
        reportUsedIgnorePattern: true,
        varsIgnorePattern: '^_+$',
      },
    ],
    'no-useless-rename': 0,
    'object-shorthand': 0,
    'prefer-arrow-callback': 'warn',
    'prefer-exponentiation-operator': 0,
    'prefer-template': 'warn',
    'spaced-comment': 0,
    '@eslint-community/eslint-comments/no-unused-enable': 'warn',
    '@eslint-community/eslint-comments/disable-enable-pair': 0,
  },
};
