#!/usr/bin/env node

/* eslint-disable n/shebang */

import { init } from '../index.mjs';

init().catch((error) => {
  if (error.message !== 'cancel') {
    throw error;
  }
});
