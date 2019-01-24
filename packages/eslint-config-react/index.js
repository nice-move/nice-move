const rules = require('@nice-move/eslint-config-base/lib/base');

module.exports = {
  extends: ['eslint:recommended', 'plugin:promise/recommended', 'airbnb'],
  plugins: ['promise'],
  rules
};
