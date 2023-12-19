export const config = {
  target: 'node18',
  entry: {
    cli: './src/index.mjs',
  },
  output: {
    path: 'dist',
    module: true,
  },
  externals: {
    enquirer: 'node-commonjs enquirer',
  },
};
