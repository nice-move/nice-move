const { env, parser } = require('./babel.cjs');

module.exports = {
  env,
  parser,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-boolean-value': ['error', 'always'],
    'react/jsx-no-useless-fragment': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/state-in-constructor': 'off',
    'react/static-property-placement': ['error', 'static public field'],
    'react/prop-types': [
      'warn',
      {
        ignore: [
          'children',
          'className',
          'location',
          'match',
          'history',
          'style',
          'meta',
        ],
      },
    ],
  },
};
