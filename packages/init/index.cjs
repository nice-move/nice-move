const { Text } = require('fs-chain');

const autoPackage = require('./lib/package.cjs');
const git = require('./lib/git.cjs');
const autoLicense = require('./lib/license.cjs');
const autoRegistry = require('./lib/registry.cjs');

module.exports = async function init() {
  await git();

  await autoLicense();

  await new Text()
    .source('./template/.editorconfig.tpl')
    .output('~.editorconfig')
    .logger('Create/Overwrite `.editorconfig`');

  await autoRegistry();

  await autoPackage();
};
