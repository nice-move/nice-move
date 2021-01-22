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
  console.log(info);

  return new Json()
    .source('~package.json')
    .config({ pretty: true })
    .handle((old) =>
      deepmerge.all([
        {
          engines: {
            node: '^12.18 || ^14',
          },
          publishConfig: info.private
            ? undefined
            : {
                access: 'public',
                registry: 'https://registry.npmjs.org/',
              },
        },
        old || {},
        info,
      ]),
    )
    .handle(format)
    .output()
    .logger('Add project info to', cyan('package.json'))
    .catch(console.warn);
};
