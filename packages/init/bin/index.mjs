#!/usr/bin/env node
import { Cheetor } from 'cheetor';

process.on('SIGINT', () => {});

new Cheetor('../package.json', import.meta.url)
  .website('https://www.npmjs.com/org/nice-move')
  .setup(() => {
    import('../lib/index.mjs')
      .then(({ init }) => {
        init();
      })
      .catch((error) => {
        if (error.message !== 'cancel') {
          throw error;
        }
      });
  });
