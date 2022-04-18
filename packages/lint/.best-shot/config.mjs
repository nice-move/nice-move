export const config = {
  target: 'node14',
  entry: {
    index: './src/index.mjs',
  },
  output: {
    path: 'dist',
    module: true,
  },
  replace: [
    {
      from: 'conventional-changelog-angular/writer-opts.js',
      to: new URL('fake.cjs', import.meta.url),
    },
  ],
};
