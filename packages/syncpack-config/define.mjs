import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { findWorkspaces } from 'find-workspaces';
import { parse } from 'yaml';

export function readYaml() {
  const path = join(process.cwd(), 'pnpm-workspace.yaml');

  const file = readFileSync(path, 'utf8');

  return parse(file).catalog || {};
}

export function defineConfig(url, config = {}) {
  let pkg = {};

  try {
    pkg = JSON.parse(
      readFileSync(
        url === '~'
          ? join(process.cwd(), 'package.json')
          : join(fileURLToPath(url), '../package.json'),
        'utf8',
      ),
    );
  } catch (error) {
    console.error(error);
  }

  const pnpm = pkg.packageManager?.startsWith?.('pnpm');

  const ws = pnpm ? (findWorkspaces() ?? []) : [];

  const catalog = pnpm ? Object.keys(readYaml()) : [];

  return {
    ...config,
    lintFormatting: false,
    customTypes: {
      ...config.customTypes,
      engines: {
        path: 'engines',
        strategy: 'versionsByName',
      },
      packageManager: {
        path: 'packageManager',
        strategy: 'name@version',
      },
      optional: {
        path: 'optionalDependencies',
        strategy: 'versionsByName',
      },
    },
    semverGroups: [
      ...(config.semverGroups || []),
      {
        dependencies: [
          '@playwright/*',
          '@sentry/*',
          '@types/react-dom',
          '@types/react',
          'playwright-*',
          'react-dom',
          'react',
          'typescript',
          'vue-router',
          'vue',
          '@vue/*',
        ],
        range: '~',
      },
      {
        dependencyTypes: ['local', 'optional', 'packageManager'],
        range: '',
      },
      {
        range: '^',
      },
    ],
    versionGroups: [
      ws.length > 0
        ? {
            dependencies: ws.map((item) => item.package.name),
            dependencyTypes: ['!local'],
            label: 'Pin pnpm workspace',
            pinVersion: 'workspace:^',
          }
        : undefined,
      catalog.length > 0
        ? {
            dependencies: catalog,
            dependencyTypes: [
              'dev',
              'prod',
              'optional',
              'peer',
              'pnpmOverrides',
            ],
            label: 'Pin pnpm catalog',
            pinVersion: 'catalog:',
          }
        : undefined,
      ...(config.versionGroups || []),
      {
        dependencies: ['node'],
        dependencyTypes: ['engines'],
        label: 'Pin engines.node',
        pinVersion: pkg.engines?.node || '^20.0.0',
      },
      {
        dependencies: [
          'react',
          'react-dom',
          '@types/react-dom',
          '@types/react',
        ],
        dependencyTypes: ['!local'],
        label: 'Pin react',
        policy: 'sameRange',
      },
      {
        dependencyTypes: ['!local'],
        label: 'Pin others',
        preferVersion: 'highestSemver',
      },
    ].filter(Boolean),
  };
}
