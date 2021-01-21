const { Text } = require('fs-chain');
const { cyan } = require('chalk');

module.exports = function EditorConfig() {
  return new Text()
    .source('../template/.editorconfig.tpl')
    .output('~.editorconfig')
    .logger('Create/Overwrite', cyan('.editorconfig'));
};
