const rules = require('@nice-move/eslint-config-base/lib/base');

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:promise/recommended',
    'airbnb-base',
    'plugin:vue/essential'
  ],
  plugins: ['promise', 'import'],
  rules
};
