const prompts = require('prompts');
const isGitRepo = require('is-git-repository');
const isGitDirty = require('is-git-dirty');

const GitInit = require('./git-init.cjs');
const Install = require('./install.cjs');
const Dependencies = require('./dependencies.cjs');
const Package = require('./package.cjs');

const { gitSupport, emptyDir, pkgCwd } = require('../lib/utils.cjs');

module.exports = async function Confirm() {
  const gitSupported = await gitSupport();
  const isGit = gitSupported && isGitRepo();
  const isDirty = isGit ? isGitDirty() : false;
  const isEmpty = emptyDir();
  const pkg = pkgCwd();
  const cwd = process.cwd();

  const options = {
    gitSupported,
    isGit,
    isDirty,
    isEmpty,
    pkg,
    cwd,
  };

  const PackagePrompts = Package.prompt(options);

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
      ...PackagePrompts,
      Dependencies.prompt(options),
      Install.prompt(options),
    ],
    {
      onCancel() {
        throw new Error('cancel');
      },
    },
  )
    .then(({ okay, ...rest }) => {
      if (okay === false) {
        throw new Error('cancel');
      }
      return Object.entries(rest);
    })
    .then((sets) => {
      const names = PackagePrompts.map(({ name }) => name);

      const info = Object.fromEntries(
        sets.filter(([key]) => names.includes(key)),
      );

      const rest = Object.fromEntries(
        sets.filter(([key]) => !names.includes(key)),
      );

      return { ...rest, info, options };
    });
};
