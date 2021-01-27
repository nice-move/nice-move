const { Text } = require('fs-chain');
const { cyan } = require('chalk');

const { pkgCwd, getAuthorName } = require('../lib/utils.cjs');

module.exports = function License() {
  const { license, author = '' } = pkgCwd();

  if (license === 'MIT' || license === 'UNLICENSE') {
    const Chain = new Text();

    if (license === 'MIT') {
      Chain.source('../template/mit.tpl').handle((text) =>
        text
          .replace('{{year}}', new Date().getFullYear())
          .replace('{{holder}}', getAuthorName(author)),
      );
    } else {
      Chain.source('../template/unlicense.tpl');
    }

    return Chain.output('~LICENSE')
      .logger('Create/Overwrite', cyan('LICENSE'))
      .catch(console.warn);
  }
};
