export const config = {
  target: 'node14',
  entry: {
    cli: './src/index.mjs',
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
    {
      from: 'lint-staged/lib/loadConfig.js',
      to: new URL('lint-staged-load-config.mjs', import.meta.url),
    },
    {
      from: '@commitlint/rules/lib/trailer-exists.js',
      to: new URL('trailer-exists.cjs', import.meta.url),
    },
  ],
};
