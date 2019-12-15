const rules = require('@nice-move/eslint-config-base/lib/base');

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'airbnb', // already include plugin:import
    'plugin:react-perf/recommended',
    'eslint-config-prettier',
    'eslint-config-prettier/unicorn'
  ],
  env: {
    es2020: true
    // node: false,
    // commonjs: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: ['react-hooks'],
  rules: {
    ...rules,
    // Checks rules of Hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
};
