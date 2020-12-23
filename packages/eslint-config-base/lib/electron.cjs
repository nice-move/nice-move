module.exports = {
  settings: {
    'import/core-modules': ['electron'],
  },
  rules: {
    'import/no-nodejs-modules': ['error', { allow: ['electron'] }],
  },
};
