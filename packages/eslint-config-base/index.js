const scaffold = [
  '**/*.{test,tests,spec}.*',
  'test.js',
  '{test,tests,spec,mock,config}/**'
];

module.exports = {
  noInlineConfig: false,
  reportUnusedDisableDirectives: true,
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
    browser: false,
    commonjs: true,
    es2020: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
      globalReturn: false,
      jsx: false
    }
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
    // 'max-depth': 'warn',
    // 'max-lines-per-function': 'warn',
    // 'max-nested-callbacks': 'warn',
    // 'max-params': 'warn',
    // 'max-statements': 'warn',
    // 'max-statements-per-line': 'warn',
    // complexity: ['warn', 8],
    // 'no-duplicate-imports': 'warn',
    // 'require-unicode-regexp': 'error',
    'unicorn/prefer-query-selector': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/expiring-todo-comments': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/{babel,postcss}.config.*',
          '**/{webpack,rollup}.config.*',
          '.best-shot/**/*.*',
          ...scaffold
        ],
        optionalDependencies: [...scaffold]
      }
    ]
  },
  ignorePatterns: [
    '!.best-shot/',
    '.best-shot/*[build,inspect,stats]/',
    '**/node_modules',
    '**/.git',
    '**/.svn'
  ]
};
