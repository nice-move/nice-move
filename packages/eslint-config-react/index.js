const rules = require('@nice-move/eslint-config-base/lib/base');

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    // already include plugin:import
    'airbnb'
  ],
  plugins: ['react-hooks'],
  rules: {
    ...rules,
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn'
  }
};
