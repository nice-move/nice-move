const { Text } = require('fs-chain');

module.exports = {
  action() {
    new Text()
      .source('~stylelint/lib/augmentConfig')
      .onDone((data) => {
        if (data.includes('ignoreFiles, ...')) {
          return data.replace('ignoreFiles, ...', '...');
        }
        return data;
      })
      .output()
      .catch(console.warn);
  },
};
