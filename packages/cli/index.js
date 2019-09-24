#!/usr/bin/env node

'use strict';

process.on('SIGINT', () => {});

const program = require('commander');
const lintStaged = require('lint-staged');
const config = require('./config.json');

program
  .option('-x, --shell', 'Skip parsing of tasks for better shell support')
  .option('-q, --quiet', 'Disable lint-staged’ s own console output')
  .parse(process.argv);

lintStaged({
  config,
  relative: process.cwd(),
  shell: !!program.shell,
  quiet: !!program.quiet,
  debug: false
})
  .then(passed => {
    process.exitCode = passed ? 0 : 1;
  })
  .catch(() => {
    process.exitCode = 1;
  });
