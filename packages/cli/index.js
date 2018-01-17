#!/usr/bin/env node

const Cheetor = require('cheetor');

process.on('SIGINT', () => {});

new Cheetor()
  .website('https://www.npmjs.com/org/nice-move')
  .command('./cmd/init')
  .command('./cmd/lint')
  .effect(({ scriptName }) => {
    process.title = scriptName;
  })
  // @ts-ignore
  .setup();
