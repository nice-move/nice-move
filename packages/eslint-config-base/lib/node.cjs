'use strict';

module.exports = {
  plugins: ['n'],
  rules: {
    'n/shebang': 'error',
    'n/no-process-env': 'error',
    'n/no-path-concat': 'error',
  },
  overrides: [
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
      files: '*.{m,c}js',
      excludedFiles: '*.nb.*',
      env: {
        browser: false,
        node: true,
        commonjs: true,
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
      ],
      rules: {
        'n/file-extension-in-import': 'error',
      },
    },
    {
      // for node.js
      files: '*.mjs',
      excludedFiles: '*.nb.*',
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
        'n/no-unsupported-features/es-syntax': [
          'error',
          { ignores: ['modules'] },
        ],
      },
    },
    {
      files: '*.cjs',
      excludedFiles: '*.nb.*',
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
  ],
};
