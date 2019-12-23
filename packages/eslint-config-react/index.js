const {
  rules,
  overrides,
  parserOptions,
  ...all
} = require('@nice-move/eslint-config-base');

const settings = {
  'import/resolver': {
    node: {
      extensions: ['.mjs']
    }
  }
};

module.exports = {
  ...all,
  rules,
  parserOptions,
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
      parserOptions: {
        ...parserOptions,
        ecmaFeatures: {
          jsx: true
        }
      },
      rules,
      settings
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
