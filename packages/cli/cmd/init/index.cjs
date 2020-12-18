const { Text } = require('fs-chain');

const autoPackage = require('./package.cjs');
const autoGitignore = require('./gitignore');
const autoLicense = require('./license');
const autoRegistry = require('./registry.cjs');

const { readTemplate } = require('../../lib');

exports.command = 'init';

exports.describe = 'Initialize your workspaces';

exports.handler = () => {
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
