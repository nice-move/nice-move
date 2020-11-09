const isThere = require('is-there');
const osLocale = require('os-locale');
const { Text } = require('fs-chain');

module.exports = function autoRegistry() {
  osLocale()
    .then((locale) => {
      if (locale === 'zh-CN') {
        // @ts-ignore

        new Text()
          .source('./.npmrc')
          .cutout((text) =>
            text.match(/registry\s?=\s?https:\/\/registry\.npm\.taobao\.org/),
          )
          .handle(
            (text) => `registry = https://registry.npm.taobao.org\r${text}`,
          )
          .output();

        // @ts-ignore
        if (!isThere.file('./.npmrc')) {
          new Text()
            .source('./.yarnrc')
            .cutout((text) =>
              text.match(/registry\s"https:\/\/registry\.npm\.taobao\.org"/),
            )
            .handle(
              (text) => `registry "https://registry.npm.taobao.org"\r${text}`,
            )
            .output();
        }
      }
    })
    .catch(() => {});
};
