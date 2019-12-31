#!/usr/bin/env node

const is = require('@nodegit/is');
const { yellow } = require('kleur');

const program = require('commander');
const lintStaged = require('lint-staged');

const config = require('./get-config.js');

process.on('SIGINT', () => {});

const notGitRoot = !is.gitRoot();

if (notGitRoot || !config) {
  console.log(
    yellow`nice-move:`,
    notGitRoot
      ? 'Run `nice-move` in Git Root directory.'
      : "Can't find `eslint/stylelint/prettier`."
  );
  process.exit(1);
}

program
  .option('-x, --shell', 'Skip parsing of tasks for better shell support')
  .option('-q, --quiet', 'Disable lint-staged’ s own console output')
  .option(
    '-p, --concurrent <parallel tasks>',
    'The number of tasks to run concurrently, or false to run tasks serially',
    true
  )
  .parse(process.argv);

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
