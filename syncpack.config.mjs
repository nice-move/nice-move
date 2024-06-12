// @ts-check

import defineConfig from '@nice-move/syncpack-config';

export default defineConfig(import.meta.url, {
  versionGroups: [
    {
      dependencies: [
        '@nice-move/eslint-plugin-html',
        '@nice-move/prettier-plugin-package-json',
      ],
      dependencyTypes: ['!local'],
      preferVersion: 'highestSemver',
    },
    {
      dependencies: ['@nice-move/eslint-config-*'],
      dependencyTypes: ['local'],
      label: 'Same version',
      pinVersion: '0.11.8',
    },
    {
      dependencies: ['@nice-move/all-in-*'],
      dependencyTypes: ['local'],
      label: 'Same version 2',
      pinVersion: '0.1.0',
    },
    {
      dependencies: ['@nice-move/*'],
      dependencyTypes: ['!local'],
      label: 'Pin pnpm workspace',
      pinVersion: 'workspace:~',
    },
  ],
});
