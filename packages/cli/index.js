#!/usr/bin/env node

'use strict';

if (process.stdout.isTTY) {
  // istanbul ignore next
  process.env.FORCE_COLOR = '1';
}

// Do not terminate main process on SIGINT
process.on('SIGINT', () => {});

const cmdLine = require('commander');

const lintStaged = require('lint-staged');

cmdLine
  .option('-c, --config [path]', 'Path to configuration file')
  .option('-r, --relative', 'Pass relative file path to tasks')
  .option('-x, --shell', 'Skip parsing of tasks for better shell support')
  .option('-q, --quiet', 'Disable lint-staged’ s own console output')
  .parse(process.argv);

lintStaged({
  configPath: cmdLine.config,
  relative: !!cmdLine.relative,
  shell: !!cmdLine.shell,
  quiet: !!cmdLine.quiet,
  debug: !!cmdLine.debug
})
  .then(passed => {
    process.exitCode = passed ? 0 : 1;
  })
  .catch(() => {
    process.exitCode = 1;
  });
