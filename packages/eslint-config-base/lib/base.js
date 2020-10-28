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
  globals: {
    process: 'readonly',
    __dirname: 'readonly',
    __filename: 'readonly',
  },
  rules: {
    camelcase: 'off',
    'no-console': 'off',
    'no-nested-ternary': 'off',
    'promise/always-return': 'off',
    'promise/avoid-new': 'off',
    'promise/catch-or-return': ['warn', { allowFinally: true }],
    'promise/no-callback-in-promise': 'off',
    'unicorn/expiring-todo-comments': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prefer-set-has': 'off',
    'unicorn/prevent-abbreviations': 'off',
  },
  overrides: [
    {
      files: 'src/**',
      globals: {
        __webpack_public_path__: 'readonly',
      },
    },
  ],
};
