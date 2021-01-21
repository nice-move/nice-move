const username = require('git-username');
const { Text } = require('fs-chain');
const { render } = require('micromustache');

const { pkgCwd } = require('../lib/utils.cjs');

module.exports = async function License() {
  const { license, author = '' } = pkgCwd();

  if (license === 'MIT') {
    // eslint-disable-next-line no-inner-declarations
    function merge(text) {
      return render(text, {
        year: new Date().getFullYear(),
        holder: author.name || author || username() || 'Unknown',
      });
    }

    await new Text()
      .source('../template/mit.tpl')
      .handle(merge)
      .output('~LICENSE')
      .logger('Create/Overwrite `LICENSE`');
  } else if (license === 'UNLICENSE') {
    await new Text()
      .source('../template/unlicense.tpl')
      .output('~LICENSE')
      .logger('Create/Overwrite `LICENSE`');
  }
};
