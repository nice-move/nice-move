const { target, env } = require('./target.cjs');

module.exports = {
  parserOptions: {
    ecmaVersion: target,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
      globalReturn: false,
      jsx: false,
    },
  },
  env: {
    browser: true,
    [env]: true,
    // not node.js
    commonjs: false,
    node: false,
  },
  plugins: ['eslint-comments'],
  rules: {
    'array-callback-return': [
      'error',
      { allowImplicit: true, checkForEach: true },
    ],
    'arrow-body-style': 'off',
    'consistent-return': 'warn',
    'eslint-comments/no-unused-disable': 'warn',
    'eslint-comments/no-unused-enable': 'warn',
    'global-require': 'off',
    'lines-between-class-members': 'off',
    'max-classes-per-file': 'warn',
    'no-console': 'off',
    'no-implicit-coercion': [
      'warn',
      {
        disallowTemplateShorthand: true,
      },
    ],
    'no-nested-ternary': 'off',
    'no-param-reassign': 'warn',
    'no-plusplus': 'warn',
    'no-template-curly-in-string': 'off',
    'no-undef-init': 'off',
    'no-underscore-dangle': 'off',
    'prefer-arrow-callback': 'warn',
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_+$',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_+$',
      },
    ],
    camelcase: 'off',
  },
};
