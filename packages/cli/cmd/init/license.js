const username = require('git-username');
const { Text } = require('fs-chain');

const { pkgCwd, readTemplate } = require('../../lib');

module.exports = function autoLicense() {
  const { license, private: isPrivate, author = '' } = pkgCwd();

  if (license === 'MIT') {
    new Text()
      .handle(() =>
        readTemplate('mit', {
          year: new Date().getFullYear(),
          holder: author.name || username(),
        }),
      )
      .output('./LICENSE');
  } else if (license === 'UNLICENSE' && !isPrivate) {
    new Text().handle(() => readTemplate('unlicense')).output('./LICENSE');
  }
};
