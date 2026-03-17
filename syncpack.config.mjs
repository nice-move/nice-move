// @ts-check
import { defineConfig } from '@nice-move/syncpack-config/define.mjs';

export default defineConfig(import.meta.url, {
  versionGroups: [
    {
      dependencies: ['@nice-move/eslint-config-*'],
      dependencyTypes: ['local'],
      pinVersion: '0.14.2',
    },
    {
      dependencies: ['@nice-move/all-in-*'],
      dependencyTypes: ['local'],
      pinVersion: '0.7.2',
    },
  ],
});
