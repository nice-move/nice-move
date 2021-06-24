#!/usr/bin/env node

import { init } from '../index.mjs';

const io = init();

if (io && io.catch) {
  io.catch((error) => {
    if (error.message !== 'cancel') {
      throw error;
    }
  });
}
