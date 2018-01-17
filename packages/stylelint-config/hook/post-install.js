const { Text } = require('fs-chain');
const isInstalled = require('is-module-installed');

if (isInstalled('stylelint/package.json')) {
  new Text('Make `config.ignoreFiles` of `stylelint` extendable')
    .source('stylelint/lib/augmentConfig')
    .handle((data) => data.replace('ignoreFiles, ', ''))
    .output();
}
