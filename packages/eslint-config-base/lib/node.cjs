'use strict';

module.exports = {
  plugins: ['node'],
  rules: {
    'node/shebang': 'error',
    'node/no-process-env': 'error',
    'node/no-path-concat': 'error',
  },
  overrides: [
    {
      files: '*.{m,c}js',
      env: {
        browser: false,
        node: true,
        commonjs: true,
      },
      rules: {
        'node/no-process-env': 'off',
        'node/no-deprecated-api': 'error',
        'node/prefer-global/url': 'warn',
        'node/prefer-global/console': 'warn',
        'node/prefer-global/process': 'warn',
        'node/prefer-global/buffer': 'warn',
        'node/prefer-global/url-search-params': 'warn',
        'node/no-unsupported-features/es-builtins': 'error',
        'node/no-unsupported-features/es-syntax': 'error',
        'node/no-unsupported-features/node-builtins': 'error',
        'node/process-exit-as-throw': 'error',
      },
    },
    {
      files: '*.*',
      excludedFiles: ['**/*.md/*', '*.cjs', '*.md'],
      rules: {
        'node/file-extension-in-import': 'error',
      },
      settings: {
        node: {
          tryExtensions: ['.vue', '.tsx', '.jsx', '.ts', '.js'],
        },
      },
    },
    {
      // for node.js
      files: '*.mjs',
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
      settings: {
        node: {
          tryExtensions: ['.mjs', '.cjs', '.js', '.ts'],
        },
      },
      rules: {
        'node/no-unsupported-features/es-syntax': [
          'error',
          { ignores: ['modules', 'dynamicImport'] },
        ],
      },
    },
    {
      files: '*.cjs',
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: false,
        },
        sourceType: 'script',
      },
      rules: {
        strict: ['error', 'global'],
        'node/no-exports-assign': 'error',
        'node/no-new-require': 'error',
        'node/no-unsupported-features/es-syntax': [
          'error',
          { ignores: ['dynamicImport'] },
        ],
      },
    },
  ],
};
