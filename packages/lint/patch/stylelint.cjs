const { Text } = require('fs-chain');

module.exports = {
  action() {
    new Text()
      .source('stylelint/lib/augmentConfig')
      .handle((data) => {
        if (data.includes('ignoreFiles, ...')) {
          data.replace('ignoreFiles, ...', '...');
        } else {
          throw new Error('skip');
        }
      })
      .output();
  },
};
