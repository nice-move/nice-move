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
        'plugin:react-perf/recommended',
        'prettier',
        'prettier/unicorn',
        'prettier/react'
      ]
    },
    {
      files: 'src/**',
      parserOptions: {
        parser: 'babel-eslint'
      }
    }
  ],
  ignorePatterns
};
