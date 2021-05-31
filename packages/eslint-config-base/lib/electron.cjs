const { pkgHas } = require('./utils.cjs');

module.exports =
  pkgHas(
    ({ devDependencies: { electron } = {} }) => electron,
    () => ({
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
      overrides: [
        {
          files: '**/*',
          excludedFiles: '*.{m,c}js',
          rules: {
            'import/no-nodejs-modules': 'off',
          },
        },
      ],
    }),
  ) || {};
