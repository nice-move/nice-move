const osLocale = require('os-locale');
const { Text } = require('fs-chain');
const { cyan } = require('chalk');

module.exports = async function Registry() {
  const InChina = (await osLocale()) === 'zh-CN';

  if (InChina) {
    return new Text()
      .source('~.npmrc')
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
      .logger('Set registry to China mirror in', cyan('.npmrc'))
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
      .logger('Set registry to China mirror in', cyan('.yarnrc'))
      .catch(console.warn);
  }
};
