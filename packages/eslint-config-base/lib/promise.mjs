import pluginPromise from 'eslint-plugin-promise';

export default [
  pluginPromise.configs['flat/recommended'],
  {
    rules: {
      'promise/always-return': 'off',
      'promise/catch-or-return': ['warn', { allowFinally: true }],
      'promise/no-callback-in-promise': 'off',
    },
  },
];
