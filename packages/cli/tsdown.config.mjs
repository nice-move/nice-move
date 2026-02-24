// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    cli: './src/index.mjs',
    'cmd/lint': './src/lint/index.mjs',
    'cmd/git': './src/cmd/git-hooks.mjs',
  },
  format: 'module',
  clean: ['dist/*'],
  target: 'node22.18',
  fixedExtension: true,
  platform: 'node',
  minify: true,
  external: ['cheetor'],
  inlineOnly: false,
});
