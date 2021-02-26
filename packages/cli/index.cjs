#!/usr/bin/env node

const Cheetor = require('cheetor');

const svgoCaller = require('./cmd/svgo.cjs');

process.on('SIGINT', () => {});

new Cheetor()
  .website('https://www.npmjs.com/org/nice-move')
  .command('./cmd/init.cjs')
  .command('./cmd/lint.cjs')
  .commandSmart(svgoCaller)
  .effect(({ scriptName }) => {
    process.title = scriptName;
  })
  // @ts-ignore
  .setup();
