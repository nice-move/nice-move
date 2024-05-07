'use strict';

const { fileURLToPath } = require('node:url');
const { join } = require('node:path');

module.exports = function defineConfig(url, config) {
  let pkg = {};

  try {
    pkg = require(join(fileURLToPath(url), '../package.json'));
  } catch (error) {
    console.error(error);
  }

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
        dependencies: ['typescript', 'react', 'react-dom'],
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
    ],
  };
};
