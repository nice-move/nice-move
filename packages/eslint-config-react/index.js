const {
  rules,
  parserOptions,
  ignorePatterns,
  overrides,
  ...all
} = require('@nice-move/eslint-config-base');

const noExtraneousDependencies = [
  'error',
  {
    devDependencies: [
      '**/{babel,postcss}.config.*',
      '**/{webpack,rollup}.config.*',
      '.best-shot/**/*.*',

      '**/*.{test,tests,spec}.*',
      'test.js',
      '{test,tests,spec,mock,config}/**'
    ]
  }
];

module.exports = {
  ...all,
  rules: {
    ...rules,
    'import/no-extraneous-dependencies': noExtraneousDependencies
  },
  parserOptions,
  overrides: [
    {
      files: 'src/**/*.jsx',
      extends: [
        'airbnb',
        'airbnb/hooks',
        'prettier',
        'prettier/unicorn',
        'prettier/react'
      ],
      parserOptions: {
        ...parserOptions,
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: {
        ...rules,
        'import/no-extraneous-dependencies': noExtraneousDependencies
      },
      settings: {
        'import/resolver': {
          node: {
            extensions: ['.mjs', '.js', '.jsx', '.json']
          }
        }
      }
    },
    {
      files: 'src/**',
      env: {
        es2020: true,
        browser: true,
        node: false,
        commonjs: true
      },
      parser: 'babel-eslint'
    },
    ...overrides
  ],
  ignorePatterns: [
    ...ignorePatterns,
    '!.best-shot/',
    '.best-shot/{build,inspect,stats}/'
  ]
};
