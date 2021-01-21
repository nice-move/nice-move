const prompts = require('prompts');
const isGitRepo = require('is-git-repository');
const isGitDirty = require('is-git-dirty');

const GitInit = require('./git-init.cjs');
const Install = require('./install.cjs');
const Dependencies = require('./dependencies.cjs');

const { gitSupport, emptyDir, pkgCwd } = require('../lib/utils.cjs');

module.exports = async function Confirm() {
  const gitSupported = await gitSupport();
  const isGit = gitSupported && isGitRepo();
  const isDirty = isGit ? isGitDirty() : false;
  const isEmpty = emptyDir();
  const pkg = pkgCwd();

  const options = {
    gitSupported,
    isGit,
    isDirty,
    isEmpty,
    pkg,
  };

  return prompts(
    [
      {
        active: 'do it',
        inactive: 'cancel',
        message:
          isDirty === true ? 'Repository not clean' : 'Workspace not empty',
        name: 'okay',
        type: () => (isEmpty || isDirty === false ? null : 'toggle'),
      },
      GitInit.prompt(options),
      Dependencies.prompt(options),
      Install.prompt(options),
    ],
    {
      onCancel() {
        throw new Error('cancel');
      },
    },
  ).then(({ okay, ...rest }) => {
    if (okay === false) {
      throw new Error('cancel');
    }
    return { ...rest, options };
  });
};
