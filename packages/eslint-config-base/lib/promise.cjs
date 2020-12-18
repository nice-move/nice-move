module.exports = {
  extends: 'plugin:promise/recommended',
  rules: {
    'promise/always-return': 'off',
    'promise/catch-or-return': ['warn', { allowFinally: true }],
    'promise/no-callback-in-promise': 'off',
  },
};
