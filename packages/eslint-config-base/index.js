const rules = require('./lib/base');

module.exports = {
  extends: ['eslint:recommended', 'plugin:promise/recommended', 'airbnb-base'],
  plugins: ['promise', 'import'],
  rules
};
