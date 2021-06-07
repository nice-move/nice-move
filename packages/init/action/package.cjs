const { cyan } = require('chalk');
const { Json } = require('fs-chain');
const deepmerge = require('deepmerge');

function format(data) {
  try {
    // eslint-disable-next-line import/no-extraneous-dependencies
    const prettier = require('prettier');

    return prettier
      .resolveConfig('./package.json')
      .then((options) => prettier.format(JSON.stringify(data), options))
      .then(JSON.parse);
  } catch {
    return data;
  }
}

module.exports = function Package(info) {
  return new Json()
    .config({ pretty: true })
    .source('package.json')
    .onFail()
    .onDone((old = {}) =>
      deepmerge.all([
        {
          engines: {
            node: '^12.15.0 || ^14.15.3',
          },
          publishConfig:
            info.private || old.private
              ? undefined
              : {
                  access: 'public',
                  registry: 'https://registry.npmjs.org/',
                },
        },
        old,
        info,
      ]),
    )
    .onDone(format)
    .output()
    .logger('Add project info to', cyan('package.json'))
    .catch(console.warn);
};
