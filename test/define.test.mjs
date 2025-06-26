import { readFileSync } from 'node:fs';

import { defineConfig } from '@nice-move/syncpack-config/define.mjs';
import { findWorkspaces } from 'find-workspaces';
import { expect, test, vi } from 'vitest';

// Mock node:fs
vi.mock('node:fs', () => ({
  readFileSync: vi.fn(),
}));

// Mock find-workspaces
vi.mock('find-workspaces', () => ({
  findWorkspaces: vi.fn(),
}));

test('should generate config for pnpm project', () => {
  // Mock package.json
  readFileSync.mockReturnValueOnce(
    JSON.stringify({
      packageManager: 'pnpm@8.0.0',
      engines: {
        node: '^18.0.0',
      },
    }),
  );

  // Mock pnpm-workspace.yaml
  readFileSync.mockReturnValueOnce(`
packages:
  - packages/*
  - modules/*

catalog:
  typescript: ~5.8.3
  vue: ^3.0.0

catalogs:
  overrides:
    eslint: ^9.29.0
    `);

  // Mock workspaces
  findWorkspaces.mockReturnValue([
    { package: { name: '@scope/package-a' } },
    { package: { name: '@scope/package-b' } },
  ]);

  const config = defineConfig('~', {
    versionGroups: [
      {
        dependencies: ['abc'],
        pinVersion: '0.12.23',
      },
    ],
  });

  expect(config).toMatchSnapshot();
});

test('should generate config for non-pnpm project', () => {
  // Mock package.json
  readFileSync.mockReturnValueOnce(
    JSON.stringify({
      packageManager: 'npm@9.0.0',
      engines: {
        node: '^16.0.0',
      },
    }),
  );

  const config = defineConfig('~', {
    versionGroups: [
      {
        dependencies: ['abc'],
        pinVersion: '0.12.23',
      },
    ],
  });

  expect(config).toMatchSnapshot();
});

test('should handle file read errors', () => {
  // Mock package.json read error
  readFileSync.mockImplementationOnce(() => {
    throw new Error('File not found');
  });

  const config = defineConfig('~', {
    versionGroups: [
      {
        dependencies: ['abc'],
        pinVersion: '0.12.23',
      },
    ],
  });

  expect(config).toMatchSnapshot();
});

test('should merge custom config', () => {
  // Mock package.json
  readFileSync.mockReturnValueOnce(
    JSON.stringify({
      packageManager: 'pnpm@8.0.0',
    }),
  );

  // Mock pnpm-workspace.yaml
  readFileSync.mockReturnValueOnce(`
packages:
  - packages/*
    `);

  const config = defineConfig('~', {
    customTypes: {
      custom: {
        path: 'customPath',
        strategy: 'customStrategy',
      },
    },
    semverGroups: [
      {
        dependencies: ['custom-dep'],
        range: '~',
      },
    ],
    versionGroups: [
      {
        dependencies: ['custom-version'],
        label: 'Custom Version',
      },
    ],
  });

  expect(config).toMatchSnapshot();
});

test('should handle empty workspace and catalog', () => {
  // Mock package.json
  readFileSync.mockReturnValueOnce(
    JSON.stringify({
      packageManager: 'pnpm@8.0.0',
    }),
  );

  // Mock empty pnpm-workspace.yaml
  readFileSync.mockReturnValueOnce('{}');

  // Mock empty workspaces
  findWorkspaces.mockReturnValue([]);

  const config = defineConfig('~', {
    versionGroups: [
      {
        dependencies: ['abc'],
        pinVersion: '0.12.23',
      },
    ],
  });

  expect(config).toMatchSnapshot();
});
