import { Cheetor } from 'cheetor';

import { init } from '../lib/index.mjs';

process.on('SIGINT', () => {});

new Cheetor('../package.json', import.meta.url)
  .website('https://www.npmjs.com/org/nice-move')
  .setup(() => {
    init().catch((error) => {
      if (error.message !== 'cancel') {
        throw error;
      }
    });
  });
