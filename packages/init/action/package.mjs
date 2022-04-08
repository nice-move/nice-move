import deepmerge from 'deepmerge';
import { Json, Text } from 'fs-chain';
import { osLocale } from 'os-locale';

import { cyan } from '../lib/color.mjs';
import latest from '../lib/latest.mjs';

const pkg = 'package.json';

async function Registry() {
  const InChina = (await osLocale()) === 'zh-CN';

  if (InChina) {
    new Text()
      .source('.npmrc')
      .onFail()
      .onDone((text = '') => {
        if (
          text.trim() &&
          /registry\s*=\s*["']?https:\/\/mirrors\.tencent\.com\/npm\/["']?/i.test(
            text,
          )
        ) {
          return text;
        }

        return `registry = https://mirrors.tencent.com/npm/\r${text}`;
      })
      .output()
      .logger('Set registry to China mirror in', cyan('.npmrc'))
      .catch(console.warn);
  }
}

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
    .onDone((final) => {
      if (!final.private) {
        Registry();
      }
    })
    .output()
    .logger('Add project info to', cyan(pkg))
    .catch(console.warn);
}
