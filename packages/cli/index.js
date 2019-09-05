#!/usr/bin/env node

process.on('SIGINT', () => {});

const { resolve } = require('path');
const program = require('commander');
const lintStaged = require('lint-staged');

program
  .option('-x, --shell', 'Skip parsing of tasks for better shell support')
  .option('-q, --quiet', 'Disable lint-staged’ s own console output')
  .parse(process.argv);

lintStaged({
  configPath: resolve(__dirname, 'config.json'),
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
