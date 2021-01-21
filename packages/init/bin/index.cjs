#!/usr/bin/env node

const init = require('../index.cjs');

init().catch?.((error) => {
  if (error.message !== 'cancel') {
    throw error;
  }
});
