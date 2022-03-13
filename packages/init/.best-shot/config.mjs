export const config = [
  {
    name: 'init',
    target: 'node14',
    entry: {
      cli: './bin/index.mjs',
    },
    output: {
      path: 'dist',
    },
  },
];
