const { Text } = require('fs-chain');

module.exports = {
  action() {
    new Text()
      .source('stylelint/lib/augmentConfig')
      .cutout((data) => data.includes('ignoreFiles, ...'))
      .handle((data) => data.replace('ignoreFiles, ...', '...'))
      .output();
  },
};
