'use strict';

const { fileURLToPath } = require('node:url');
const { join } = require('node:path');
const { findWorkspaces } = require('find-workspaces');

module.exports = function defineConfig(url, config = {}) {
  let pkg = {};

  try {
    pkg = require(
      url === '~'
        ? join(process.cwd(), 'package.json')
        : join(fileURLToPath(url), '../package.json'),
    );
  } catch (error) {
    console.error(error);
  }

  const ws = pkg.packageManager?.startsWith?.('pnpm')
    ? findWorkspaces() ?? []
    : [];

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
    },
    semverGroups: [
      ...(config.semverGroups || []),
      {
        dependencies: [
          'typescript',
          'react',
          'react-dom',
          '@types/react-dom',
          '@types/react',
        ],
        range: '~',
      },
      {
        dependencyTypes: ['local', 'packageManager'],
        range: '',
      },
      {
        dependencyTypes: ['!engines'],
        range: '^',
      },
    ],
    versionGroups: [
      {
        dependencies: ['@types/**'],
        dependencyTypes: ['!peer'],
        isBanned: true,
        label: '@types packages should only be under peerDependencies',
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
      ws.length > 0
        ? {
            dependencies: ws.map((item) => item.package.name),
            dependencyTypes: ['!local'],
            label: 'Pin pnpm workspace',
            pinVersion: 'workspace:~',
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
        dependencyTypes: ['!local'],
        label: 'Pin others',
        preferVersion: 'highestSemver',
      },
    ].filter(Boolean),
  };
};
