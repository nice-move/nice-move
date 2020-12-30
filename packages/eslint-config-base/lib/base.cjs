const { target, env } = require('./target.cjs');
const existThenReturn = require('./utils.cjs');

function BestShot() {
  return existThenReturn('@best-shot/preset-env/package.json', () => [
    {
      files: 'src/**', // eslint-disable-next-line import/no-unresolved
      globals: require('@best-shot/preset-env/eslint.js').globals,
    },
  ]);
}

function webpack() {
  return existThenReturn('webpack/package.json', () => [
    {
      files: 'src/**/*',
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
