const rules = require('./lib/base');

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:promise/recommended',
    'plugin:import/recommended',
    'plugin:unicorn/recommended',
    'airbnb-base',
    'eslint-config-prettier',
    'eslint-config-prettier/unicorn'
  ],
  env: {
    es2020: true
    // node: false,
    // commonjs: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules
};
