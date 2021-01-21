const isGitDirty = require('is-git-dirty');

const autoPackage = require('./action/package.cjs');
const EditorConfig = require('./action/editorconfig.cjs');
const Git = require('./action/git.cjs');
const License = require('./action/license.cjs');
const Registry = require('./action/registry.cjs');

const { Confirm } = require('./lib/prompt.cjs');
const { gitSupport, emptyDir } = require('./lib/utils.cjs');

async function action(gitSupported) {
  if (gitSupported) {
    await Git();
  }

  await EditorConfig();

  await autoPackage();

  Registry();
  License();
}

module.exports = async function init() {
  const isEmpty = emptyDir();

  const gitSupported = await gitSupport();

  const isDirty = gitSupported ? !!isGitDirty() : false;

  if (isEmpty || !isDirty) {
    action(gitSupported);
  } else {
    Confirm({
      message: isDirty ? 'Repository not clean' : 'Workspace not empty',
      callback() {
        action(gitSupported);
      },
    });
  }
};
