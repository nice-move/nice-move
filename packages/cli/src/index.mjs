import { Cheetor } from 'cheetor';

import * as hooks from './cmd/git-hooks.mjs';
import { svgoCaller } from './cmd/svgo.mjs';
import * as lint from './lint/index.mjs';

process.on('SIGINT', () => {});

new Cheetor('../package.json', import.meta.url)
  .website('https://www.npmjs.com/org/nice-move')
  .command(lint)
  .command(hooks)
  .commandSmart(svgoCaller)
  .setup();
