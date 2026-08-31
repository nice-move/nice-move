import { execa } from 'execa';

import { green, red } from '../lib/color.mts';

const message = 'Initialize as git repository';

async function init() {
  try {
    const io = await execa('git', ['init']);

    console.log(green('√'), message);

    return io;
  } catch (error) {
    console.log(red('×'), message);
    throw error;
  }
}

export function GitInit({ gitSupported, isRoot }) {
  return {
    message,
    name: 'GitInit',
    initial: true,
    type: (first) =>
      first === false || !gitSupported || isRoot ? null : 'confirm',

    format(value) {
      if (value === true) {
        return init;
      }
    },
  };
}
