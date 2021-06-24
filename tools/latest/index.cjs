#!/usr/bin/env node

'use strict';

const { JsonToText } = require('fs-chain');

function getLocalVersion(...names) {
  return Object.fromEntries(
    names.map((name) => [
      name,
      `^${require(`@nice-move/${name}/package.json`).version}`,
    ]),
  );
}

new JsonToText()
  .source('package.json')
  .onDone(({ devDependencies: { nodemon, ...rest } }) => ({
    ...rest,
    ...require('./package.json').peerDependencies,
    ...getLocalVersion(
      'eslint-config-base',
      'stylelint-config',
      'prettier-config',
      'commitlint-config',
      'cli',
    ),
    // eslint-disable-next-line import/no-extraneous-dependencies
    lts: require('@nice-move/init/package.json').engines.node,
  }))
  .onDone((data) => `export default ${JSON.stringify(data)}`)
  .output('~@nice-move/init/lib/latest.mjs');
