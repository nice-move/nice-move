#!/usr/bin/env node

import { Cheetor } from 'cheetor';

import { svgoCaller } from './cmd/svgo.mjs';

process.on('SIGINT', () => {});

new Cheetor('./package.json', import.meta.url)
  .website('https://www.npmjs.com/org/nice-move')
  .commandSafe('@nice-move/lint/dist/index.mjs')
  .commandSafe('../cmd/git-hooks.mjs')
  .commandSmart(svgoCaller)
  .setup();
