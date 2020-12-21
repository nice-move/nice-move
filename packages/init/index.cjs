const { Text } = require('fs-chain');

const { readTemplate } = require('./lib/utils.cjs');
const autoPackage = require('./lib/package.cjs');
const autoGitignore = require('./lib/gitignore.cjs');
const autoLicense = require('./lib/license.cjs');
const autoRegistry = require('./lib/registry.cjs');

module.exports = function init() {
  new Text()
    .source('./.editorconfig')
    .handle(() => readTemplate('.editorconfig'))
    .output();

  new Text()
    .source('./.gitattributes')
    .handle(() => readTemplate('.gitattributes'))
    .output();

  autoRegistry();
  autoLicense();

  autoGitignore()
    .catch(console.error)
    .finally(() => {
      autoPackage();
    });
};
