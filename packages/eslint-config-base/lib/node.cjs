'use strict';

const { getGlobals } = require('./utils.cjs');

const esmConfig = require('eslint-plugin-n/lib/configs/recommended-module');
const cjsConfig = require('eslint-plugin-n/lib/configs/recommended-script');

module.exports = {
  plugins: ['n'],
  rules: {
    'n/hashbang': 'error',
    'n/no-process-env': 'error',
    'n/no-path-concat': 'error',
  },
  overrides: [
    {
      files: ['**/*.{js,jsx,ts,tsx,mjs,mts,cts,vue}'],
      rules: esmConfig.eslintrc.rules,
    },
    {
      files: ['**/*.{cjs,qs,wxs}'],
      rules: cjsConfig.eslintrc.rules,
    },
    {
      files: '**/*',
      excludedFiles: ['*.cjs', '*.cts'],
      rules: {
        'import/no-commonjs': 'error',
      },
    },
    {
      files: '**/*.{m,c}{t,j}s',
      env: {
        node: true,
      },
      parserOptions: {
        ecmaFeatures: {
          globalReturn: true,
        },
      },
      globals: {
        ...getGlobals({ es2025: true, node: true }),
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
      files: '**/*.*',
      excludedFiles: ['*.cjs', '*.wxs', '*.qs', '*.md', '**/*.md/*'],
      rules: {
        'n/file-extension-in-import': 'error',
      },
    },
    {
      files: ['**/*.cjs'],
      rules: {
        strict: ['error', 'global'],
        'n/no-exports-assign': 'error',
        'n/no-new-require': 'error',
      },
    },
    {
      files: ['**/*.cjs', '**/*.cts'],
      rules: {
        'unicorn/prefer-module': 'off',
      },
    },
    {
      files: ['**/*.mjs', '**/*.mts'],
      env: {
        commonjs: false,
      },
    },
  ],
};
