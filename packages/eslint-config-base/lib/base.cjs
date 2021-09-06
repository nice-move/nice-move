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
    'sonarjs/cognitive-complexity': 'off',
    'sonarjs/no-duplicate-string': 'off',
    'sonarjs/no-identical-functions': 'off',
    'array-callback-return': [
      'error',
      {
        allowImplicit: true,
        checkForEach: true,
      },
    ],
    'no-useless-rename': 'off',
    'object-shorthand': 'off',
    'arrow-body-style': 'off',
    camelcase: 'off',
    'class-methods-use-this': 'warn',
    'consistent-return': 'warn',
    'eslint-comments/no-unused-disable': 'warn',
    'eslint-comments/no-unused-enable': 'warn',
    'global-require': 'off',
    'lines-between-class-members': 'off',
    'max-classes-per-file': 'off',
    'no-console': 'off',
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
    'no-nested-ternary': 'off',
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
    'no-template-curly-in-string': 'off',
    'no-undef-init': 'off',
    'no-underscore-dangle': 'off',
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
    'spaced-comment': 'off',
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
