import { execa } from 'execa';
import prompts from 'prompts';

import { emptyDir, getPkg } from '../lib/utils.mjs';

import { Dependencies } from './dependencies.mjs';
import { GitInit } from './git-init.mjs';
import { Package } from './package.mjs';

function gitSupport() {
  return execa('git', ['--version']).then(({ stdout }) => Boolean(stdout));
}

function isGitRoot() {
  return execa('git', ['rev-parse', '--git-dir'])
    .then(({ stdout }) => stdout === '.git')
    .catch(() => false);
}

function isGitDirty() {
  return execa('git', ['status', '--short']).then(
    ({ stdout }) => stdout.length > 0,
  );
}

export async function Prompt() {
  const gitSupported = await gitSupport();
  const isRoot = gitSupported && (await isGitRoot());
  const isDirty = isRoot ? await isGitDirty() : false;
  const isEmpty = emptyDir();
  const pkg = getPkg();
  const cwd = process.cwd();

  const options = {
    gitSupported,
    isRoot,
    isDirty,
    isEmpty,
    pkg,
    cwd,
  };

  const PackagePrompts = await Package(options);

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
      GitInit(options),
      ...PackagePrompts,
      Dependencies(options),
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
