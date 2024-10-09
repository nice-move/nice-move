// @ts-check
import defineConfig from '@nice-move/syncpack-config/define.cjs';

export default defineConfig(import.meta.url, {
  versionGroups: [
    {
      dependencies: ['typescript'],
      packages: ['@nice-move/tsconfig'],
      pinVersion: '~5.5.4',
    },
    {
      dependencies: ['@nice-move/eslint-config-*'],
      dependencyTypes: ['local'],
      label: 'Same version 1',
      pinVersion: '0.11.24',
    },
    {
      dependencies: ['@nice-move/all-in-*'],
      dependencyTypes: ['local'],
      label: 'Same version 2',
      pinVersion: '0.2.4',
    },
  ],
});
