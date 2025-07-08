// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    cli: './bin/index.mjs',
  },
  format: 'module',
  clean: ['dist/*'],
  target: 'node20',
  fixedExtension: true,
  platform: 'node',
  minify: true,
});
