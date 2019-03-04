module.exports = {
  extends: ['eslint:recommended', 'plugin:promise/recommended', 'airbnb-base'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['promise'],
  rules: {
    'arrow-parens': ['warn', 'as-needed'],
    'comma-dangle': ['warn', 'never'],
    'no-console': 'off',
    'no-nested-ternary': 'off',
    'promise/always-return': 'off',
    'promise/catch-or-return': 'off',
    'template-curly-spacing': 'off'
  }
};
