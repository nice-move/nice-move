'use strict';

const { configHas } = require('./utils.cjs');

const commonjs =
  configHas(
    ({ commonjs: globs = [] }) => globs,
    (globs) => globs,
  ) || [];

module.exports = {
  plugins: ['n'],
  rules: {
    'n/hashbang': 'error',
    'n/no-process-env': 'error',
    'n/no-path-concat': 'error',
  },
  overrides: [
    {
      files: '**/*',
      excludedFiles: ['*.cjs', '*.cts', ...commonjs],
      rules: {
        'import/no-commonjs': 'error',
      },
    },
    {
      files: '*.nb.*',
      env: {
        browser: false,
        node: true,
        commonjs: true,
      },
      rules: {
        'no-unused-vars': 'warn',
        'import/no-extraneous-dependencies': 'off',
        'import/no-commonjs': 'off',
        'import/no-nodejs-modules': 'off',
        'unicorn/prefer-module': 'off',
      },
    },
    {
      files: '*.{m,c}{t,j}s',
      excludedFiles: '*.nb.*',
      env: {
        node: true,
      },
      rules: {
        'n/no-deprecated-api': 'error',
        'n/no-process-env': 'off',
        'n/no-process-exit': 'warn',
        'n/no-unsupported-features/es-builtins': 'error',
        'n/no-unsupported-features/es-syntax': 'error',
        'n/no-unsupported-features/node-builtins': 'error',
        'n/prefer-global/buffer': 'warn',
        'n/prefer-global/console': 'warn',
        'n/prefer-global/process': 'warn',
        'n/prefer-global/url-search-params': 'warn',
        'n/prefer-global/url': 'warn',
        'n/process-exit-as-throw': 'error',
      },
    },
    {
      files: '*.*',
      excludedFiles: [
        '*.{m,c}ts',
        '*.cjs',
        '*.md',
        '*.nb.*',
        '*.ts',
        '**/*.md/*',
        ...commonjs,
      ],
      rules: {
        'n/file-extension-in-import': 'error',
      },
    },
    {
      files: ['*.mjs', '*.js', '*.jsx'],
      parser: '@babel/eslint-parser',
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
          plugins: [require.resolve('@babel/plugin-syntax-import-attributes')],
        },
      },
    },
    {
      // for node.js
      files: ['*.mjs', '*.mts'],
      excludedFiles: '*.nb.*',
      env: {
        browser: false,
        commonjs: false,
      },
      globals: {
        __dirname: 'off',
        __filename: 'off',
        exports: 'off',
        module: 'off',
        require: 'off',
      },
    },
    {
      files: ['*.cjs', ...commonjs],
      excludedFiles: '*.nb.*',
      env: {
        browser: false,
        commonjs: true,
      },
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: false,
        },
        sourceType: 'script',
      },
      rules: {
        strict: ['error', 'global'],
        'n/no-exports-assign': 'error',
        'n/no-new-require': 'error',
      },
    },
    {
      files: ['*.cjs', '*.cts'],
      rules: {
        'unicorn/prefer-module': 'off',
      },
    },
  ],
};
