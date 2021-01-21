const { Text } = require('fs-chain');
const { cyan } = require('chalk');

module.exports = function Readme(name) {
  return new Text()
    .source('~readme.md')
    .exists((exists) => !exists)
    .handle(() => `# ${name}\n`)
    .output()
    .logger('Create', cyan('readme.md'));
};
