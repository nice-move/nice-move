const { commonRules } = require('eslint-plugin-node/lib/configs/_commons');

module.exports = {
  plugins: ['node'],
  env: {
    browser: false,
    node: true,
    commonjs: true,
  },
  globals: {
    exports: 'writable',
  },
  rules: {
    ...commonRules,
    'no-process-exit': 'off',
    'node/no-extraneous-import': 'off',
    'node/no-missing-import': 'off',
    'node/no-missing-require': 'off',
    'node/no-new-require': 'error',
    'node/no-unpublished-import': 'off',
    'node/no-unpublished-require': 'off',
  },
};
