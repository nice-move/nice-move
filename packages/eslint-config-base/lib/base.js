const { target, env } = require('./target');

function BestShot() {
  try {
    require.resolve('@best-shot/preset-env/package.json');
    // @ts-ignore
    // eslint-disable-next-line global-require, import/no-unresolved
    return require('@best-shot/preset-env/eslint.js').globals;
    // eslint-disable-next-line no-empty
  } catch {}
}

// eslint-disable-next-line consistent-return
function webpack() {
  try {
    require.resolve('webpack/package.json');
    return {
      __webpack_public_path__: 'readonly',
      __resourceQuery: 'readonly',
    };
    // eslint-disable-next-line no-empty
  } catch {}
}

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
    'no-template-curly-in-string': 'off',
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
        ...webpack(),
        ...BestShot(),
      },
    },
  ],
};
