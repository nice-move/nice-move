const { Text } = require('fs-chain');
const { cyan } = require('chalk');

module.exports = function Readme({ name, description }) {
  return new Text()
    .source('~README.md')
    .exists((exists) => !exists)
    .handle(() => `# ${name}\n${description ? `${description}.\n` : ''}`)
    .output()
    .logger('Create', cyan('README.md'));
};
