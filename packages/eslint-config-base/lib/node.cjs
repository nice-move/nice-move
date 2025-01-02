'use strict';

const { getGlobals } = require('./utils.cjs');

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
      files: '*.*',
      excludedFiles: ['*.{m,c}ts', '*.cjs', '*.md', '*.ts', '**/*.md/*'],
      rules: {
        'n/file-extension-in-import': 'error',
      },
    },
    {
      files: ['**/*.cjs'],
      globals: {
        ...getGlobals({ es2025: true, commonjs: true, node: true }),
      },
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: false,
          globalReturn: true,
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
      files: ['**/*.cjs', '**/*.cts'],
      rules: {
        'unicorn/prefer-module': 'off',
      },
      parserOptions: {
        ecmaFeatures: {
          globalReturn: true,
        },
      },
    },
  ],
};
