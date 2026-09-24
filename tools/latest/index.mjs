#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { deepmerge } from 'deepmerge-ts';

import { JsonToText } from 'fs-chain';
import { parse } from 'yaml';

import ownPkg from './package.json' with { type: 'json' };

function readPackageJson(name) {
  const url = import.meta.resolve(`${name}/package.json`);

  return JSON.parse(readFileSync(fileURLToPath(url), 'utf8'));
}

function readYaml() {
  try {
    const path = join(process.cwd(), 'pnpm-workspace.yaml');
    const file = readFileSync(path, 'utf8');
    const parsed = parse(file) || {};

    // 确保 catalog 和 catalogs 是对象
    return deepmerge(
      parsed.catalog && typeof parsed.catalog === 'object'
        ? parsed.catalog
        : {},
      ...Object.values(
        parsed.catalogs && typeof parsed.catalogs === 'object'
          ? parsed.catalogs
          : {},
      ),
    );
  } catch (error) {
    console.error('Failed to read pnpm-workspace.yaml:', error);

    return {};
  }
}

function getLocalVersion(...names) {
  return Object.fromEntries(
    names.map((name) => {
      const pkg = readPackageJson(`@nice-move/${name}`);

      return [`@nice-move/${name}`, `^${pkg.version}`];
    }),
  );
}

new JsonToText()
  .source('package.json')
  .onDone(
    ({
      devDependencies: { nodemon, execa, ...rest },
      packageManager,
      engines,
    }) => ({
      ...rest,
      ...ownPkg.peerDependencies,
      ...getLocalVersion(
        'eslint-config-base',
        'stylelint-config',
        'prettier-config',
        'syncpack-config',
        'tsconfig',
        'cli',
        'init',
      ),
      ...readYaml(),
      packageManager,
      engines,
    }),
  )
  .onDone((data) => `export default ${JSON.stringify(data)}`)
  .output('~@nice-move/init/lib/latest.mjs');
