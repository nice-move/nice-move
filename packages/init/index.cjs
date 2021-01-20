const { Text } = require('fs-chain');
const emptyDir = require('empty-dir');
const execa = require('execa');
const isGitDirty = require('is-git-dirty');

const autoPackage = require('./lib/package.cjs');
const git = require('./lib/git.cjs');
const autoLicense = require('./lib/license.cjs');
const autoRegistry = require('./lib/registry.cjs');
const { Confirm } = require('./lib/prompt.cjs');

async function gitSupport() {
  try {
    const { stdout } = await execa('git', ['--version']);
    return !!stdout;
  } catch {
    return false;
  }
}

async function action(gitSupported) {
  if (gitSupported) {
    await git();
  }

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

  const gitSupported = await gitSupport();

  const isDirty = gitSupported ? !!isGitDirty() : false;

  if (!isDirty || isEmpty) {
    action(gitSupported);
  } else {
    Confirm({
      message: isDirty ? 'Repository is not clean' : 'Workspace is not empty',
      callback() {
        action(gitSupported);
      },
    });
  }
};
