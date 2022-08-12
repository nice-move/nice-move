'use strict';

const { getPkg } = require('settingz');

// eslint-disable-next-line consistent-return
function configHas(checker, getResult) {
  const pkg = getPkg('nice-move');

  const io = checker(pkg);

  if (io) {
    return getResult(io, pkg);
  }
}

module.exports = {
  configHas,
};
