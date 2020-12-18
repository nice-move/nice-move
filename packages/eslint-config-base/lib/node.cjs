const { commonRules } = require('eslint-plugin-node/lib/configs/_commons');

module.exports = {
  plugins: ['node'],
  env: {
    browser: false,
    node: true,
    commonjs: true,
  },
  rules: {
    ...commonRules,
    'no-process-exit': 'off',
    'node/no-unpublished-require': 'off',
  },
};
