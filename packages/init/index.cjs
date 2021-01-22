const EditorConfig = require('./action/editorconfig.cjs');
const GitFile = require('./action/git-file.cjs');
const License = require('./action/license.cjs');
const Registry = require('./action/registry.cjs');
const Readme = require('./action/readme.cjs');
const Package = require('./action/package.cjs');

const Prompt = require('./prompt/index.cjs');

module.exports = async function init() {
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
    () => Package(info),
    Readme,
    License,
    EditorConfig,
    () => (GitInit || isGit ? GitFile() : null),
    Registry,
    Dependencies,
    Install,
  ].filter((func) => typeof func === 'function');

  // eslint-disable-next-line no-restricted-syntax
  for (const action of actions) {
    // eslint-disable-next-line no-await-in-loop
    await action()?.catch?.((error) => {
      console.warn(error.message);
    });
  }
};
