const { Text } = require('fs-chain');

module.exports = {
  action() {
    new Text()
      .source('stylelint/lib/augmentConfig')
      .handle((data) => {
        if (data.includes('ignoreFiles, ...')) {
          return data.replace('ignoreFiles, ...', '...');
        }
        throw new Error('skip');
      })
      .output()
      .catch(console.warn);
  },
};
