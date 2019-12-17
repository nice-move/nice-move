const {
  extends: Extends,
  env,
  ignorePatterns,
  overrides,
  parserOptions,
  rules
} = require('@nice-move/eslint-config-base');

module.exports = {
  extends: Extends,
  env,
  parserOptions,
  rules,
  overrides: [
    ...overrides,
    {
      files: '**/*.jsx',
      extends: [
        'airbnb',
        'airbnb/hooks',
        'prettier',
        'prettier/unicorn',
        'prettier/react'
      ],
      rules
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
    }
  ],
  ignorePatterns
};
