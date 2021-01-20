const { Text } = require('fs-chain');
const emptyDir = require('empty-dir');

const autoPackage = require('./lib/package.cjs');
const git = require('./lib/git.cjs');
const autoLicense = require('./lib/license.cjs');
const autoRegistry = require('./lib/registry.cjs');

const { Confirm } = require('./lib/prompt.cjs');

async function action() {
  await git();

  await autoLicense();

  await new Text()
    .source('./template/.editorconfig.tpl')
    .output('~.editorconfig')
    .logger('Create/Overwrite `.editorconfig`');

  await autoRegistry();

  await autoPackage();
}

module.exports = async function init() {
  const isEmpty = await emptyDir(process.cwd());

  if (isEmpty) {
    action();
  } else {
    Confirm({
      message: 'Workspace is not empty',
      callback: action,
    });
  }
};
