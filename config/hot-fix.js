'use strict';

const FsChain = require('fs-chain');

new FsChain('Mission 1')
  .message('Fix `stylelint` in `vsCode`')
  .source('stylelint-config-prettier/src/index', true)
  .handle(data => data.replace("'unicode-bom': null,", ''))
  .output();

new FsChain('Mission 2')
  .message('Make `ignoreFiles` of `stylelint` extendeble')
  .source('stylelint/lib/augmentConfig', true)
  .handle(data => data.replace("'ignoreFiles'", "'fake'"))
  .output();
