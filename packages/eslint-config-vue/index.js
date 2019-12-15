const rules = require('@nice-move/eslint-config-base/lib/base');

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:promise/recommended',
    'plugin:import/recommended',
    'plugin:unicorn/recommended',
    'airbnb-base',
    'plugin:vue/essential',
    'eslint-config-prettier',
    'eslint-config-prettier/unicorn'
  ],
  env: {
    es2020: true
    // node: false,
    // commonjs: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules
};
