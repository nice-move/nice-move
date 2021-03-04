const { Text } = require('fs-chain');
const { cyan } = require('chalk');

const { pkgCwd, getAuthorName } = require('../lib/utils.cjs');

module.exports = function License() {
  const { license, author = '', private: isPrivate } = pkgCwd();

  if (license === 'MIT') {
    return new Text()
      .source('../template/mit.tpl')
      .handle((text) =>
        text
          .replace('{{year}}', new Date().getFullYear())
          .replace('{{holder}}', getAuthorName(author)),
      )
      .output('~LICENSE')
      .logger('Create/Overwrite', cyan('LICENSE'))
      .catch(console.warn);
  }

  if (license === 'UNLICENSE' && !isPrivate) {
    return new Text()
      .source('../template/unlicense.tpl')
      .output('~LICENSE')
      .logger('Create/Overwrite', cyan('LICENSE'))
      .catch(console.warn);
  }
};
