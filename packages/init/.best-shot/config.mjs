export const config = {
  target: 'node14',
  entry: {
    cli: './bin/index.mjs',
  },
  output: {
    path: 'dist',
    module: true,
    library: {
      type: 'module',
    },
  },
  externals: {
    'spawn-sync': 'node-commonjs spawn-sync',
  },
};
