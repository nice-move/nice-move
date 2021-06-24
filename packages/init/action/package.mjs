import deepmerge from 'deepmerge';
import { Json } from 'fs-chain';

import { cyan } from '../lib/color.mjs';

async function format(data) {
  // eslint-disable-next-line import/no-extraneous-dependencies
  const { default: prettier } = await import('prettier');

  return prettier
    .resolveConfig('package.json')
    .then((options) =>
      prettier.format(JSON.stringify(data), {
        ...options,
        filepath: 'package.json',
      }),
    )
    .then(JSON.parse)
    .catch(() => data);
}

export function Package(info) {
  return new Json()
    .config({ pretty: true })
    .source('package.json')
    .onFail()
    .onDone((old = {}) =>
      deepmerge.all([
        {
          engines: {
            node: '^12.20.0 || ^14.15.3',
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
}
