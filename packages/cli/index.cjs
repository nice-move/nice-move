#!/usr/bin/env node

const Cheetor = require('cheetor');

process.on('SIGINT', () => {});

new Cheetor()
  .website('https://www.npmjs.com/org/nice-move')
  .command('./cmd/init.cjs')
  .command('./cmd/lint.cjs')
  .effect(({ scriptName }) => {
    process.title = scriptName;
  })
  // @ts-ignore
  .setup();
