const { Text } = require('fs-chain');
const { cyan } = require('chalk');

const { pkgCwd } = require('../lib/utils.cjs');

module.exports = function Readme() {
  const { name, description } = pkgCwd();

  return new Text()
    .source('~README.md')
    .exists((exists) => !exists)
    .handle(() => `# ${name}\n${description ? `${description}.\n` : ''}`)
    .output()
    .logger('Create', cyan('README.md'));
};
