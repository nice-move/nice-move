const { target, env } = require('./target');

module.exports = {
  parserOptions: {
    ecmaVersion: target,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
      globalReturn: false,
      jsx: false,
    },
  },
  env: {
    browser: false,
    commonjs: true,
    [env]: true,
    node: true,
  },
  rules: {
    camelcase: 'off',
    'no-console': 'off',
    'promise/always-return': 'off',
    'promise/avoid-new': 'off',
    'promise/catch-or-return': [
      'warn',
      {
        allowFinally: true,
      },
    ],
    'promise/no-callback-in-promise': 'off',
    'unicorn/expiring-todo-comments': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prevent-abbreviations': 'off',
  },
};
