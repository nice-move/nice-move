const execa = require('execa');
const { green, red } = require('chalk');

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

exports.prompt = ({ gitSupported, isGit }) => ({
  message,
  name: 'gitInit',
  initial: true,
  type: (first) =>
    first === false || !gitSupported || isGit ? null : 'confirm',
  // eslint-disable-next-line consistent-return
  format(value) {
    if (value === true) {
      return init;
    }
  },
});
