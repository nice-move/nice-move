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
      pinVersion: '0.11.7',
    },
    {
      dependencies: ['@nice-move/*'],
      dependencyTypes: ['!local'],
      label: 'Pin pnpm workspace',
      pinVersion: 'workspace:~',
    },
  ],
});
