import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    testTimeout: 20000,
    include: ['test/*.test.mjs'],
    reporters: process.env.CI ? ['html', 'junit', 'default'] : ['default'],
    outputFile: {
      html: '.temp/index.html',
      junit: '.temp/index.xml',
    },
  },
});
