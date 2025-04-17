#!/usr/bin/env node
import { createRequire } from 'node:module';

import { readYaml } from '@nice-move/syncpack-config/define.mjs';
import { JsonToText } from 'fs-chain';

const require = createRequire(import.meta.url);

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
