const { Text } = require('fs-chain');

module.exports = function EditorConfig() {
  return new Text()
    .source('../template/.editorconfig.tpl')
    .output('~.editorconfig')
    .logger('Create/Overwrite `.editorconfig`');
};
