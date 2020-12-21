const { target, env } = require('./target.cjs');

function isSafeError(error) {
  return (
    error.code === 'MODULE_NOT_FOUND' && error.requireStack[0] === __filename
  );
}

// eslint-disable-next-line consistent-return
function existThenReturn(checker, getResult) {
  try {
    require.resolve(checker);
    return getResult();
  } catch (error) {
    if (!isSafeError(error)) {
      throw error;
    }
  }
}

function BestShot() {
  return existThenReturn(
    '@best-shot/preset-env/package.json',
    // eslint-disable-next-line import/no-unresolved
    () => require('@best-shot/preset-env/eslint.js').globals,
  );
}

function webpack() {
  return existThenReturn('webpack/package.json', () => ({
    __webpack_public_path__: 'readonly',
    __resourceQuery: 'readonly',
    __dirname: 'readonly',
    __filename: 'readonly',
  }));
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
    browser: true,
    [env]: true,
    // not node.js
    commonjs: false,
    node: false,
  },
  rules: {
    'array-callback-return': [
      'error',
      { allowImplicit: true, checkForEach: true },
    ],
    'global-require': 'off',
    'no-console': 'off',
    'no-nested-ternary': 'off',
    'no-template-curly-in-string': 'off',
    camelcase: 'off',
  },
  overrides: [
    {
      files: 'src/**',
      globals: {
        ...webpack(),
        ...BestShot(),
      },
    },
    {
      // for node.js
      files: '*.cjs',
      extends: require.resolve('./node.cjs'),
    },
    {
      // for node.js
      files: '*.mjs',
      extends: require.resolve('./node.cjs'),
      env: {
        commonjs: false,
      },
      globals: {
        __dirname: 'off',
        __filename: 'off',
        exports: 'off',
        module: 'off',
        require: 'off',
      },
      rules: {
        'node/no-unsupported-features/es-syntax': [
          'error',
          { ignores: ['modules'] },
        ],
      },
    },
  ],
};
