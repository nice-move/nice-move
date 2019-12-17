module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:promise/recommended',
    'plugin:import/recommended',
    'plugin:unicorn/recommended',
    'airbnb-base',
    'prettier',
    'prettier/unicorn'
  ],
  env: {
    es2020: true,
    browser: false,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    camelcase: 'off',
    'import/first': 'off',
    'import/order': 'off',
    'import/extensions': 'off',
    'no-console': 'off',
    'no-nested-ternary': 'off',
    'promise/always-return': 'off',
    'promise/avoid-new': 'off',
    'promise/catch-or-return': [
      'warn',
      {
        allowFinally: true
      }
    ],
    'promise/no-callback-in-promise': 'off',
    // 'max-lines': 'warn',
    // 'max-depth': 'warn',
    // 'max-lines-per-function': 'warn',
    // 'max-nested-callbacks': 'warn',
    // 'max-params': 'warn',
    // 'max-statements': 'warn',
    // 'max-statements-per-line': 'warn',
    // complexity: ['warn', 8],
    // 'no-duplicate-imports': 'warn',
    // 'require-atomic-updates': 'error',
    // 'require-unicode-regexp': 'error',
    'unicorn/prefer-query-selector': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/expiring-todo-comments': 'off'
  },
  overrides: [
    {
      files: '*.*',
      excludedFiles: 'src/**',
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: [
              '**/*.{test,tests,spec}.*',
              '**/{babel,postcss}.config.*',
              '**/{webpack,rollup}.config.*',
              '.best-shot/**/*.*',
              'test.js',
              '{test,tests,spec,mock,config}/**'
            ],
            optionalDependencies: false
          }
        ]
      }
    }
  ],
  ignorePatterns: [
    '!.best-shot/',
    '.best-shot/*[build,inspect,stats]/',
    '**/node_modules',
    '**/.git',
    '**/.svn'
  ]
};
