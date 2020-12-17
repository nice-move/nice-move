const extensions = ['.mjs', '.cjs', '.js', '.json'];

function Electron() {
  try {
    require.resolve('electron/package.json');
    return ['plugin:import/recommended', 'plugin:import/electron'];
  } catch {
    return ['plugin:import/recommended'];
  }
}

module.exports = {
  extends: Electron(),
  rules: {
    'import/first': 'off',
    'import/order': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
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
  },
  settings: {
    'import/extensions': extensions,
    'import/resolver': {
      node: { extensions },
    },
  },
};
