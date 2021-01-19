const username = require('git-username');
const { Text } = require('fs-chain');
const { render } = require('micromustache');

const { pkgCwd } = require('./utils.cjs');

module.exports = function autoLicense() {
  const { license, author = '' } = pkgCwd();

  if (license === 'MIT') {
    // eslint-disable-next-line no-inner-declarations
    function merge(text) {
      return render(text, {
        year: new Date().getFullYear(),
        holder: author.name || author || username() || 'Unknown',
      });
    }

    new Text().source('./template/mit.tpl').handle(merge).output('~LICENSE');
  } else if (license === 'UNLICENSE') {
    new Text().source('./template/unlicense.tpl').output('~LICENSE');
  }
};
