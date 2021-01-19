const { Text } = require('fs-chain');

const autoPackage = require('./lib/package.cjs');
const autoGitignore = require('./lib/gitignore.cjs');
const autoLicense = require('./lib/license.cjs');
const autoRegistry = require('./lib/registry.cjs');

module.exports = async function init() {
  new Text().source('./template/.editorconfig.tpl').output('~.editorconfig');

  new Text().source('./template/.gitattributes.tpl').output('~.gitattributes');

  autoRegistry();

  autoLicense();

  await autoGitignore();

  await autoPackage();
};
