// @ts-check
import { defineConfig } from '@nice-move/syncpack-config/define.mjs';

export default defineConfig(import.meta.url, {
  versionGroups: [
    {
      dependencies: ['@nice-move/eslint-config-*'],
      dependencyTypes: ['local'],
      pinVersion: '0.15.9',
      severity: {
        RefuseToPinLocal: 'fix',
      },
    },
    {
      dependencies: ['@nice-move/all-in-*'],
      dependencyTypes: ['local'],
      pinVersion: '0.8.13',
      severity: {
        RefuseToPinLocal: 'fix',
      },
    },
  ],
});
