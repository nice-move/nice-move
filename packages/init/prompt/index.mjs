import isGitDirty from 'is-git-dirty';
import isGitRepo from 'is-git-repository';
import prompts from 'prompts';

import { emptyDir, gitSupport, pkgCwd } from '../lib/utils.mjs';

import { Dependencies } from './dependencies.mjs';
import { GitInit } from './git-init.mjs';
import { Install } from './install.mjs';
import { Package } from './package.mjs';

export async function Prompt() {
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
}
