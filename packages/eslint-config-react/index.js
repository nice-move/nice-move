'use strict';

const rules = require('@nice-move/eslint-config-base/lib/base');

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'airbnb' // already include plugin:import
  ],
  plugins: ['react-hooks'],
  rules: {
    ...rules,
    // Checks rules of Hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
};
