const { rules, overrides, ...all } = require('@nice-move/eslint-config-base');

module.exports = {
  ...all,
  rules,
  overrides: [
    ...overrides,
    {
      files: 'src/**/*.jsx',
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
  ]
};
