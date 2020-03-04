const FsChain = require('fs-chain');

new FsChain('Mission 1')
  .message('Make `ignoreFiles` of `stylelint` extendable')
  .source('stylelint/lib/augmentConfig', true)
  .handle(data => data.replace("'ignoreFiles'", "'fake'"))
  .output();
