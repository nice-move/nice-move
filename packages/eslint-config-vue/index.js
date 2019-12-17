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
      files: '**/*.vue',
      extends: [
        'plugin:vue/essential',
        'prettier',
        'prettier/unicorn',
        'prettier/vue'
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
      parserOptions: {
        parser: 'babel-eslint'
      }
    }
  ],
  ignorePatterns
};
