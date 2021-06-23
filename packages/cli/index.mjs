#!/usr/bin/env node

import { Cheetor } from 'cheetor';

import svgoCaller from './cmd/svgo.cjs';

process.on('SIGINT', () => {});

new Cheetor('../package.json', import.meta.url)
  .website('https://www.npmjs.com/org/nice-move')
  .commandFrom('../cmd/init.cjs')
  .commandFrom('../cmd/lint.mjs')
  .commandSmart(svgoCaller)
  .effect(({ scriptName }) => {
    process.title = scriptName;
  })
  // @ts-ignore
  .setup();
