const { Text } = require('fs-chain');
const { cyan } = require('chalk');

module.exports = function EditorConfig() {
  return new Text()
    .source('../template/.editorconfig.tpl', __dirname)
    .output('.editorconfig')
    .logger('Create/Overwrite', cyan('.editorconfig'))
    .catch(console.warn);
};
