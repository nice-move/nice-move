const osLocale = require('os-locale');
const { Text } = require('fs-chain');

module.exports = async function autoRegistry() {
  const InChina = (await osLocale()) === 'zh-CN';

  if (InChina) {
    await new Text()
      .source('~.npmrc')
      .exists((exists) => exists)
      .handle((text) => {
        if (
          /registry\s*=\s*https:\/\/mirrors\.cloud\.tencent\.com\/npm\//.test(
            text,
          )
        ) {
          throw new Error('skip');
        }
        return `registry = https://mirrors.cloud.tencent.com/npm/\r${text}`;
      })
      .output()
      .logger('Using China registry mirror')
      .source('~.yarnrc')
      .exists((exists) => exists)
      .handle((text) => {
        if (
          /registry\s+"https:\/\/mirrors\.cloud\.tencent\.com\/npm\/"/.test(
            text,
          )
        ) {
          throw new Error('skip');
        }
        return `registry "https://mirrors.cloud.tencent.com/npm/"\r${text}`;
      })
      .output()
      .logger('Using China registry mirror')
      .catch(console.warn);
  }
};
