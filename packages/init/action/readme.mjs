import { Text } from 'fs-chain';

import { cyan } from '../lib/color.mjs';
import { getPkg } from '../lib/utils.mjs';

export async function Readme() {
  const { name, description } = getPkg();

  new Text()
    .source('README.md')
    .onFail()
    .onDone(
      (text) =>
        text ||
        [`# ${name}`, description ? `${description}.\n` : '']
          .filter(Boolean)
          .join('\n\n'),
    )
    .output()
    .logger('Create', cyan('README.md'))
    .catch(console.warn);
}
