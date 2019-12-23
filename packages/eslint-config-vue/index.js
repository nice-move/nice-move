const {
  rules,
  overrides,
  parserOptions,
  ...all
} = require('@nice-move/eslint-config-base');

module.exports = {
  ...all,
  rules,
  parserOptions,
  overrides: [
    ...overrides,
    {
      files: 'src/**/*.vue',
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
        ...parserOptions,
        parser: 'babel-eslint'
      }
    }
  ]
};
