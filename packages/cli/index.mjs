#!/usr/bin/env node

import { Cheetor } from 'cheetor';

import { svgoCaller } from './cmd/svgo.mjs';

process.on('SIGINT', () => {});

new Cheetor('./package.json', import.meta.url)
  .website('https://www.npmjs.com/org/nice-move')
  .commandFrom('../cmd/lint.mjs')
  .commandSmart(svgoCaller)
  .setup();
