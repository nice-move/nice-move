// @ts-check
import { defineConfig } from '@nice-move/syncpack-config/define.mjs';

export default defineConfig(import.meta.url, {
  versionGroups: [
    {
      dependencies: ['@nice-move/eslint-config-*'],
      dependencyTypes: ['local'],
      label: 'Same version 1',
      pinVersion: '0.12.25',
    },
    {
      dependencies: ['@nice-move/all-in-*'],
      dependencyTypes: ['local'],
      label: 'Same version 2',
      pinVersion: '0.5.3',
    },
  ],
});
