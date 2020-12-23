const existThenReturn = require('./utils.cjs');

function Electron() {
  return existThenReturn('electron/package.json', () => [
    require.resolve('./electron.cjs'),
  ]);
}

module.exports = {
  extends: ['plugin:import/recommended', ...(Electron() || [])],
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
    'import/no-dynamic-require': 'off',
    'import/order': 'off',
    'import/prefer-default-export': 'off',
  },
  settings: {
    'import/ignore': false,
    'import/extensions': ['.mjs', '.cjs', '.js'],
    'import/resolver': {
      node: {
        extensions: ['.mjs', '.cjs', '.js'],
      },
    },
  },
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
      files: '*.*',
      excludedFiles: '*.{m,c}js',
      rules: {
        'import/no-nodejs-modules': 'error',
      },
    },
  ],
};
