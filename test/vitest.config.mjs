import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/*.test.mjs'],
    reporters: process.env.CI ? ['html', 'junit', 'basic'] : ['basic'],
    outputFile: {
      html: '.temp/index.html',
      junit: '.temp/index.xml',
    },
  },
});
