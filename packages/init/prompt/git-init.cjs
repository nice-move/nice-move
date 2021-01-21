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
  active: 'yes',
  inactive: 'no',
  message,
  name: 'gitInit',
  type: (first) =>
    first === false || !gitSupported || isGit ? null : 'toggle',
  // eslint-disable-next-line consistent-return
  format(value) {
    if (value === true) {
      return init;
    }
  },
});
