// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    cli: './bin/index.mjs',
  },
  format: 'module',
  clean: ['dist/*'],
  target: 'node22.18',
  fixedExtension: true,
  platform: 'node',
  minify: true,
  inlineOnly: false,
});
