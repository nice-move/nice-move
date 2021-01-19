#!/usr/bin/env node

const init = require('../index.cjs');

init().catch?.((error) => {
  console.warn(error);
  process.exitCode = 1;
});
