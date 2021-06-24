import { EditorConfig } from './action/editorconfig.mjs';
import { GitFile } from './action/git-file.mjs';
import { License } from './action/license.mjs';
import { Package } from './action/package.mjs';
import { Readme } from './action/readme.mjs';
import { Registry } from './action/registry.mjs';
import { Prompt } from './prompt/index.mjs';

export async function init() {
  const {
    Dependencies,
    GitInit,
    Install,
    info,
    options: { isGit } = {},
  } = await Prompt();

  console.log('-'.repeat(32));

  const actions = [
    GitInit,
    Registry,
    () => Package(info),
    Readme,
    License,
    EditorConfig,
    () => (GitInit || isGit ? GitFile() : undefined),
    () => (Dependencies ? Dependencies(GitInit || isGit) : undefined),
    Install,
  ].filter((func) => typeof func === 'function');

  for (const action of actions) {
    // eslint-disable-next-line no-await-in-loop
    const io = await action();
    if (io && io.catch) {
      io.catch((error) => {
        console.warn(error.message);
      });
    }
  }
}
