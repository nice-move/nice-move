const { commonRules } = require('eslint-plugin-node/lib/configs/_commons');

module.exports = {
  plugins: ['node'],
  rules: commonRules,
  env: {
    browser: false,
    node: true,
    commonjs: true,
  },
};
