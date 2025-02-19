// @ts-check
import defineConfig from '@nice-move/syncpack-config/define.cjs';

export default defineConfig(import.meta.url, {
  versionGroups: [
    {
      dependencies: ['@nice-move/eslint-config-*'],
      dependencyTypes: ['local'],
      label: 'Same version 1',
      pinVersion: '0.12.10',
    },
    {
      dependencies: ['@nice-move/all-in-*'],
      dependencyTypes: ['local'],
      label: 'Same version 2',
      pinVersion: '0.4.11',
    },
  ],
});
