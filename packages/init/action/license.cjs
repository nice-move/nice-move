const { Text } = require('fs-chain');
const { cyan } = require('chalk');

const { pkgCwd, getAuthorName } = require('../lib/utils.cjs');

module.exports = function License() {
  const { license, author = '' } = pkgCwd();

  const isMIT = license === 'MIT';

  if (isMIT || license === 'Unlicense') {
    return new Text()
      .source(
        isMIT ? '../template/mit.tpl' : '../template/unlicense.tpl',
        __dirname,
      )
      .handle((text) =>
        isMIT
          ? text
              .replace('{{year}}', new Date().getFullYear())
              .replace('{{holder}}', getAuthorName(author))
          : text,
      )
      .output('LICENSE')
      .logger('Create/Overwrite', cyan('LICENSE'))
      .catch(console.warn);
  }
};
