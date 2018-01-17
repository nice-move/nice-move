const rules = require('./lib/base');

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:promise/recommended',
    'plugin:import/recommended',
    'plugin:unicorn/recommended',
    'airbnb-base'
  ],
  rules
};
