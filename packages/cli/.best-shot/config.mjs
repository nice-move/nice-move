export const config = {
  target: 'node20',
  entry: {
    cli: {
      import: './src/index.mjs',
      dependOn: ['cmd/lint', 'cmd/git'],
    },
    'cmd/lint': './src/lint/index.mjs',
    'cmd/git': './src/cmd/git-hooks.mjs',
  },
  output: {
    path: 'dist',
    module: true,
    library: {
      type: 'module',
    },
  },
  externals: {
    cheetor: 'module cheetor',
    enquirer: 'module enquirer',
    lilconfig: 'module lilconfig',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: true,
  },
};
