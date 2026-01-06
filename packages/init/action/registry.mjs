import { osLocale } from 'os-locale';
import { Text } from 'fs-chain';
import { cyan } from '../lib/color.mts';

export async function Registry() {
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
