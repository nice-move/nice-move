import { parser, plugin } from 'typescript-eslint';

export default {
  languageOptions: {
    parser,
    parserOptions: {
      sourceType: 'module',
    },
  },
  plugins: {
    '@typescript-eslint': plugin,
  },
  rules: {
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/media-has-caption': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'react/destructuring-assignment': 0,
    'react/function-component-definition': 0,
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'ignore', children: 'never' },
    ],
    'react/jsx-filename-extension': 0,
    'react/jsx-no-useless-fragment': 'warn',
    'react/jsx-props-no-spreading': 0,
    'react/prefer-exact-props': 0,
    'react/prop-types': [
      'warn',
      {
        ignore: ['children', 'className', 'style', 'meta'],
      },
    ],
    'react/require-default-props': 0,
    'react/forbid-prop-types': [
      'error',
      {
        checkChildContextTypes: true,
        checkContextTypes: true,
        forbid: ['any', 'array'],
      },
    ],
    'react/no-object-type-as-default-prop': 'warn',
    // handing by garou
    'react/jsx-boolean-value': 0,
    'react/self-closing-comp': 0,
    'react/sort-comp': 0,
  },
};
