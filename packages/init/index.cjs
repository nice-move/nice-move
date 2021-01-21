const { EOL } = require('os');

const EditorConfig = require('./action/editorconfig.cjs');
const GitFile = require('./action/git-file.cjs');
const License = require('./action/license.cjs');
const Registry = require('./action/registry.cjs');

const Prompt = require('./prompt/index.cjs');

module.exports = async function init() {
  const {
    Dependencies,
    GitInit,
    Install,
    options: { isGit } = {},
  } = await Prompt();

  console.log(EOL, '-'.repeat(20), EOL);

  const actions = [
    GitInit,
    License,
    EditorConfig,
    async () => {
      if (GitInit || isGit) {
        await GitFile();
      }
    },
    Registry,
    Dependencies,
    Install,
  ].filter((func) => func);

  // eslint-disable-next-line no-restricted-syntax
  for (const action of actions) {
    // eslint-disable-next-line no-await-in-loop
    await action();
  }
};
