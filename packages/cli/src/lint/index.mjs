import { commit } from './commit.mjs';
import { staged } from './staged.mjs';

export const command = 'lint';

export const description = '';

export function builder(cli) {
  commit(cli);
  staged(cli);

  cli.demandCommand(1, 'Typing `commit` or `staged`');
}
