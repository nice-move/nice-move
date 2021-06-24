import chalk from 'chalk';
import execa from 'execa';

const { green, red } = chalk;

const message = 'Initialize as git repository';

function init() {
  return execa('git', ['init']).then(
    (io) => {
      console.log(green('√'), message);
      return io;
    },
    (error) => {
      console.log(red('×'), message);
      throw error;
    },
  );
}

export function GitInit({ gitSupported, isGit }) {
  return {
    message,
    name: 'GitInit',
    initial: true,
    type: (first) =>
      first === false || !gitSupported || isGit ? null : 'confirm',
    // eslint-disable-next-line consistent-return
    format(value) {
      if (value === true) {
        return init;
      }
    },
  };
}
