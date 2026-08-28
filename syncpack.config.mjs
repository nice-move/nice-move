// @ts-check
import { defineConfig } from '@nice-move/syncpack-config/define.mjs';

export default defineConfig(import.meta.url, {
  versionGroups: [
    {
      dependencies: ['@nice-move/eslint-config-*'],
      dependencyTypes: ['local'],
      pinVersion: '0.15.10',
      severity: {
        RefuseToPinLocal: 'fix',
      },
    },
    {
      dependencies: ['@nice-move/all-in-*'],
      dependencyTypes: ['local'],
      pinVersion: '0.8.14',
      severity: {
        RefuseToPinLocal: 'fix',
      },
    },
  ],
});
