const username = require('git-username');
const { Text } = require('fs-chain');
const { render } = require('micromustache');
const { cyan } = require('chalk');

const { pkgCwd } = require('../lib/utils.cjs');

module.exports = function License() {
  const { license, author = '' } = pkgCwd();

  const Chain = new Text();

  if (license === 'MIT') {
    // eslint-disable-next-line no-inner-declarations
    function merge(text) {
      return render(text, {
        year: new Date().getFullYear(),
        holder: author.name || author || username() || 'Unknown',
      });
    }

    Chain.source('../template/mit.tpl').handle(merge);
  } else if (license === 'UNLICENSE') {
    Chain.source('../template/unlicense.tpl');
  }

  return Chain.output('~LICENSE').logger('Create/Overwrite', cyan('LICENSE'));
};
