#!/usr/bin/env node

const { yellow } = require('kleur');

process.on('SIGINT', () => {});

const program = require('commander');
const lintStaged = require('lint-staged');

const config = require('./config.js');

program
  .option('-x, --shell', 'Skip parsing of tasks for better shell support')
  .option('-q, --quiet', 'Disable lint-staged’ s own console output')
  .option(
    '-p, --concurrent <parallel tasks>',
    'The number of tasks to run concurrently, or false to run tasks serially',
    true
  )
  .parse(process.argv);

if (!config) {
  console.log(yellow`nice-move:`, "That's nothing I can do.");
  process.exit(1);
}

lintStaged({
  config,
  relative: process.cwd(),
  shell: !!program.shell,
  quiet: !!program.quiet,
  concurrent: program.concurrent,
  debug: false
})
  .then(passed => {
    process.exitCode = passed ? 0 : 1;
  })
  .catch(() => {
    process.exitCode = 1;
  });
