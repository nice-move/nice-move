const isInstalled = require('is-module-installed');

const Chain = require('fs-chain');

if (isInstalled('stylelint')) {
  new Chain('Mission 1')
    .message('Make `config.ignoreFiles` of `stylelint` extendable')
    .source('stylelint/lib/augmentConfig', true)
    .handle(data => data.replace('ignoreFiles, ', ''))
    .output();
}
