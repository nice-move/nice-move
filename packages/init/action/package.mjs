import { deepmerge } from 'deepmerge-ts';
import { Json } from 'fs-chain';

import { cyan } from '../lib/color.mts';
import latest from '../lib/latest.mjs';
import { Registry } from './registry.mjs';

const pkg = 'package.json';

export function Package(info) {
  return new Json()
    .config({ pretty: true })
    .source(pkg)
    .onFail()
    .onDone((old = {}) =>
      deepmerge(
        {
          packageManager: latest.packageManager,
          type: 'module',
          engines: {
            node: latest.engines.node,
            pnpm: latest.engines.pnpm,
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
      ),
    )
    .onDone((final) => {
      if (final.private === true) {
        Registry();
      }

      return final;
    })
    .output()
    .logger('Add project info to', cyan(pkg))
    .catch(console.warn);
}
