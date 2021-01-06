const { target, env } = require('./target.cjs');
const existThenReturn = require('./utils.cjs');

function isSafeError(error) {
  return (
    error.code === 'MODULE_NOT_FOUND' && error.requireStack[0] === __filename
  );
}

function safeGet(name) {
  try {
    return require(name);
  } catch (error) {
    if (isSafeError(error)) {
      // eslint-disable-next-line consistent-return
      return;
    }
    throw error;
  }
}

function BestShot() {
  return existThenReturn('@best-shot/preset-env/package.json', () => [
    {
      files: 'src/**',
      ...(safeGet('@best-shot/preset-env/eslint.cjs') ||
        safeGet('@best-shot/preset-env/eslint.js')),
    },
  ]);
}

function webpack() {
  return existThenReturn('webpack/package.json', () => [
    {
      files: 'src/**',
      excludedFiles: ['*.mjs', '*.cjs'],
      env: {
        commonjs: true,
      },
      globals: {
        __webpack_public_path__: 'readonly',
        __resourceQuery: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
      rules: {
        'import/no-commonjs': 'warn',
      },
    },
  ]);
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
  plugins: ['eslint-comments'],
  rules: {
    'array-callback-return': [
      'error',
      { allowImplicit: true, checkForEach: true },
    ],
    'arrow-body-style': 'off',
    'consistent-return': 'warn',
    'eslint-comments/no-unused-disable': 'warn',
    'eslint-comments/no-unused-enable': 'warn',
    'global-require': 'off',
    'lines-between-class-members': 'off',
    'no-console': 'off',
    'no-nested-ternary': 'off',
    'no-template-curly-in-string': 'off',
    camelcase: 'off',
  },
  overrides: [...(webpack() || []), ...(BestShot() || [])],
};
