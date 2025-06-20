import base from '@nice-move/all-in-base';

export default [
  ...base,
  {
    files: ['packages/init/bin/index.mjs', 'packages/cli/src/index.mjs'],
    rules: {
      'n/hashbang': 'off',
    },
  },
];
