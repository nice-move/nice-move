const osLocale = require('os-locale');
const { Text } = require('fs-chain');
const { cyan } = require('chalk');

module.exports = async function Registry() {
  const InChina = (await osLocale()) === 'zh-CN';

  if (InChina) {
    const chain = new Text().source('.npmrc');

    const io = await chain.then(
      () =>
        chain
          .handle((text) => {
            if (
              /registry\s*=\s*["']?https:\/\/mirrors\.cloud\.tencent\.com\/npm\/["']?/i.test(
                text,
              )
            ) {
              throw new Error('skip');
            }
            return `registry = https://mirrors.cloud.tencent.com/npm/\r${text}`;
          })
          .output(),
      () => chain,
    );

    io.logger('Set registry to China mirror in', cyan('.npmrc')).catch(
      console.warn,
    );
  }
};
