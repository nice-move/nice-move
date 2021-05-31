module.exports = {
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
    'react/jsx-boolean-value': 'off',
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'ignore', children: 'never' },
    ],
    'react/jsx-no-useless-fragment': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-uses-react': 'off',
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
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'warn',
    'react/self-closing-comp': 'off',
    'react/sort-comp': 'off',
  },
  settings: {
    'import/extensions': ['.jsx', '.js', null],
    'import/resolver': {
      node: {
        extensions: ['.jsx', '.js', null],
      },
    },
    node: {
      tryExtensions: ['.jsx', '.js', null],
    },
  },
};
