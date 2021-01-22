const { Text } = require('fs-chain');
const { render } = require('micromustache');
const { cyan } = require('chalk');

const { pkgCwd, getAuthorName } = require('../lib/utils.cjs');

module.exports = function License() {
  const { license, author = '' } = pkgCwd();

  if (license === 'MIT' || license === 'UNLICENSE') {
    const Chain = new Text();

    if (license === 'MIT') {
      const merge = (text) =>
        render(text, {
          year: new Date().getFullYear(),
          holder: getAuthorName(author),
        });

      Chain.source('../template/mit.tpl').handle(merge);
    } else {
      Chain.source('../template/unlicense.tpl');
    }

    return Chain.output('~LICENSE').logger('Create/Overwrite', cyan('LICENSE'));
  }
};
