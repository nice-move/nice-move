#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { deepmerge } from 'deepmerge-ts';

import { JsonToText } from 'fs-chain';
import { parse } from 'yaml';

const require = createRequire(import.meta.url);

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
      const pkg = require(`@nice-move/${name}/package.json`);

      return [`@nice-move/${name}`, `^${pkg.version}`];
    }),
  );
}

new JsonToText()
  .source('package.json')
  .onDone(({ devDependencies: { nodemon, execa, ...rest } }) => ({
    ...rest,
    ...require('./package.json').peerDependencies,
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
    lts: require('@nice-move/init/package.json').engines.node,
  }))
  .onDone((data) => `export default ${JSON.stringify(data)}`)
  .output('~@nice-move/init/lib/latest.mjs');
