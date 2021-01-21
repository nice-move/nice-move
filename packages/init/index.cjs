const EditorConfig = require('./action/editorconfig.cjs');
const GitFile = require('./action/git-file.cjs');
const License = require('./action/license.cjs');
const Registry = require('./action/registry.cjs');
const Readme = require('./action/readme.cjs');

const Prompt = require('./prompt/index.cjs');

module.exports = async function init() {
  const {
    Dependencies,
    GitInit,
    Install,
    options: { isGit, pkg } = {},
  } = await Prompt();

  console.log('-'.repeat(32));

  const actions = [
    GitInit,
    // eslint-disable-next-line consistent-return
    () => {
      if (pkg.name) {
        return Readme(pkg.name);
      }
    },
    License,
    EditorConfig,
    // eslint-disable-next-line consistent-return
    () => {
      if (GitInit || isGit) {
        return GitFile();
      }
    },
    Registry,
    Dependencies,
    Install,
  ].filter((func) => func);

  // eslint-disable-next-line no-restricted-syntax
  for (const action of actions) {
    // eslint-disable-next-line no-await-in-loop
    await action()?.catch((error) => {
      console.warn(error.message);
    });
  }
};
