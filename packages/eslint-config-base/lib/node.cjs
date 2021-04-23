const { commonRules } = require('eslint-plugin-node/lib/configs/_commons');

module.exports = {
  plugins: ['node'],
  rules: {
    'node/file-extension-in-import': 'error',
    'node/global-require': 'off',
    'node/shebang': 'error',
    'node/no-process-env': 'error',
  },
  settings: {
    node: {
      tryExtensions: ['.js', '.json'],
    },
  },
  overrides: [
    {
      files: ['*.{m,c}js', '*.node'],
      env: {
        browser: false,
        node: true,
        commonjs: true,
      },
      rules: {
        ...commonRules,
        'no-process-exit': 'off',
        'node/no-extraneous-require': 'off',
        'node/no-extraneous-import': 'off',
        'node/no-missing-import': 'off',
        'node/no-missing-require': 'off',
        'node/no-new-require': 'error',
        'node/no-unpublished-import': 'off',
        'node/no-unpublished-require': 'off',
      },
      settings: {
        node: {
          tryExtensions: ['.cjs', '.js', '.json'],
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
          tryExtensions: ['.mjs', '.cjs', '.js', '.json'],
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
      files: ['*.{m,c}js', '*.node'],
      rules: {
        'node/no-process-env': 'off',
      },
    },
  ],
};
