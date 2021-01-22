const existThenReturn = require('./utils.cjs');

const electron =
  existThenReturn('electron/package.json', () => ({
    rules: {
      'import/no-nodejs-modules': 'off',
    },
    settings: {
      'import/core-modules': ['electron'],
    },
    globals: {
      Buffer: 'readonly',
      clearImmediate: 'readonly',
      global: 'readonly',
      process: 'readonly',
      setImmediate: 'readonly',
    },
  })) || {};

module.exports = {
  extends: ['plugin:import/recommended'],
  rules: {
    'import/extensions': [
      'error',
      'always',
      {
        ignorePackages: true,
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.{test,tests,spec}.{m,c,}js',
          '{test,tests}.{m,c,}js',
          '{test,tests,config}/**/*.{m,c,}js',
          '**/.{eslint,stylelint,prettier,babel,postcss}rc.{m,c,}js',
          '**/{eslint,stylelint,prettier,webpack,rollup,babel,postcss}.config.{m,c,}js',
          '.best-shot/**/*.*',
        ],
      },
    ],
    'import/newline-after-import': 'off',
    'import/no-dynamic-require': 'off',
    'import/order': 'off',
    'import/prefer-default-export': 'off',
  },
  settings: {
    ...electron.settings,
    'import/ignore': false,
    'import/extensions': ['.mjs', '.cjs', '.js'],
    'import/resolver': {
      node: {
        extensions: ['.mjs', '.cjs', '.js'],
      },
    },
  },
  globals: electron.globals,
  overrides: [
    {
      files: '*.cjs',
      rules: {
        'import/extensions': 'off',
      },
      settings: {
        'import/extensions': false,
        'import/resolver': {
          node: {
            extensions: false,
          },
        },
      },
    },
    {
      // for node.js
      files: '*.mjs',
      rules: {
        'import/no-commonjs': 'error',
      },
    },
    {
      files: '**/*',
      excludedFiles: ['*.{m,c}js', '*.node'],
      rules: {
        'import/no-nodejs-modules': 'error',
        ...electron.rules,
      },
    },
  ],
};
