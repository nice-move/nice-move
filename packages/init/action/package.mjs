import deepmerge from 'deepmerge';
import { Json } from 'fs-chain';

import { cyan } from '../lib/color.mjs';
import latest from '../lib/latest.mjs';

const pkg = 'package.json';

export function Package(info) {
  return new Json()
    .config({ pretty: true })
    .source(pkg)
    .onFail()
    .onDone((old = {}) =>
      deepmerge.all([
        {
          engines: {
            node: latest.lts,
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
    .output()
    .logger('Add project info to', cyan(pkg))
    .catch(console.warn);
}
