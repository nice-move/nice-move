const osLocale = require('os-locale');
const { Text } = require('fs-chain');

module.exports = async function autoRegistry() {
  const InChina = (await osLocale()) === 'zh-CN';

  if (InChina) {
    new Text()
      .exists('~.npmrc')
      .source()
      .handle((text) => {
        if (
          text.match(
            /registry\s*=\s*https:\/\/mirrors\.cloud\.tencent\.com\/npm\//,
          )
        ) {
          throw new Error('skip');
        }
        return `registry = https://mirrors.cloud.tencent.com/npm/\r${text}`;
      })
      .output()
      .catch(console.warn);

    new Text()
      .exists('~.yarnrc')
      .source()
      .handle((text) => {
        if (
          text.match(
            /registry\s+"https:\/\/mirrors\.cloud\.tencent\.com\/npm\/"/,
          )
        ) {
          throw new Error('skip');
        }
        return `registry "https://mirrors.cloud.tencent.com/npm/"\r${text}`;
      })
      .output()
      .catch(console.warn);
  }
};
