#!/usr/bin/env node

const is = require('@nodegit/is');
const { yellow } = require('kleur');

const program = require('commander');
const lintStaged = require('lint-staged');

const config = require('./get-config.js');

// Do not terminate main Listr process on SIGINT
process.on('SIGINT', () => {});

const notGitRoot = !is.gitRoot();

if (notGitRoot || !config) {
  console.log(
    yellow`nice-move:`,
    notGitRoot
      ? 'Please run `nice-move` in Git Root directory.'
      : "Can't find `eslint/stylelint/prettier`."
  );
  process.exit(1);
}

program
  .name('nice-move')
  .option(
    '--allow-empty',
    'allow empty commits when tasks revert all staged changes',
    false
  )
  .option(
    '-p, --concurrent <parallel tasks>',
    'the number of tasks to run concurrently, or false to run tasks serially',
    true
  )
  .option('-q, --quiet', "disable lint-staged's own console output", false)
  .option('-r, --relative', 'pass relative filePaths to tasks', false)
  .option(
    '-x, --shell',
    'skip parsing of tasks for better shell support',
    false
  )
  .parse(process.argv);

function getMaxArgLength() {
  switch (process.platform) {
    case 'darwin':
      return 262144;
    case 'win32':
      return 8191;
    default:
      return 131072;
  }
}

lintStaged({
  config,
  allowEmpty: !!program.allowEmpty,
  concurrent: program.concurrent,
  maxArgLength: getMaxArgLength() / 2,
  quiet: !!program.quiet,
  relative: process.cwd(),
  shell: !!program.shell,
  debug: false
})
  .then(passed => {
    process.exitCode = passed ? 0 : 1;
  })
  .catch(() => {
    process.exitCode = 1;
  });
