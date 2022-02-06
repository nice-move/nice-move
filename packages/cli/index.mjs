#!/usr/bin/env node

import { Cheetor } from 'cheetor';

import { svgoCaller } from './cmd/svgo.mjs';

process.on('SIGINT', () => {});

new Cheetor('./package.json', import.meta.url)
  .website('https://www.npmjs.com/org/nice-move')
  .commandSafe('@nice-move/lint/cmd/commit.mjs')
  .commandSafe('@nice-move/lint/cmd/staged.mjs')
  .commandSafe('@nice-move/lint/cmd/all.mjs')
  .commandSmart(svgoCaller)
  .setup();
