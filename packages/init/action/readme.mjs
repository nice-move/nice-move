import { Text } from 'fs-chain';
import { getPkg } from 'settingz';

import { cyan } from '../lib/color.mjs';

export async function Readme() {
  const { name, description } = getPkg();

  new Text()
    .source('README.md')
    .onFail()
    .onDone((text) =>
      !text
        ? [`# ${name}`, description ? `${description}.\n` : '']
            .filter(Boolean)
            .join('\n\n')
        : text,
    )
    .output()
    .logger('Create', cyan('README.md'))
    .catch(console.warn);
}
