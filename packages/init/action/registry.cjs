const osLocale = require('os-locale');
const { Text } = require('fs-chain');
const { cyan } = require('chalk');

module.exports = async function Registry() {
  const InChina = (await osLocale()) === 'zh-CN';

  if (InChina) {
    new Text()
      .source('.npmrc')
      .onFail()
      .onDone((text = '') => {
        if (
          text.trim() &&
          /registry\s*=\s*["']?https:\/\/mirrors\.cloud\.tencent\.com\/npm\/["']?/i.test(
            text,
          )
        ) {
          return text;
        }
        return `registry = https://mirrors.cloud.tencent.com/npm/\r${text}`;
      })
      .output()
      .logger('Set registry to China mirror in', cyan('.npmrc'))
      .catch(console.warn);
  }
};
