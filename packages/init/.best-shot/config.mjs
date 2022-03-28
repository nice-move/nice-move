export const config = {
  target: 'node14',
  entry: {
    cli: './bin/index.mjs',
  },
  output: {
    path: 'dist',
    module: true,
  },
  externals: {
    'spawn-sync': 'spawn-sync commonjs2',
  },
};
