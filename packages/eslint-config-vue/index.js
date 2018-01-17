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
      files: 'src/**/*.vue',
      extends: [
        'plugin:vue/essential',
        'prettier',
        'prettier/unicorn',
        'prettier/vue'
      ],
      rules: {
        ...rules,
        'import/no-extraneous-dependencies': noExtraneousDependencies
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
      parserOptions: {
        ...parserOptions,
        parser: 'babel-eslint'
      }
    },
    ...overrides
  ],
  ignorePatterns: [
    ...ignorePatterns,
    '!.best-shot/',
    '.best-shot/{build,inspect,stats}/'
  ]
};
