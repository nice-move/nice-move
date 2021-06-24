import { Text } from 'fs-chain';

import { cyan } from '../lib/color.mjs';
import { pkgCwd } from '../lib/utils.mjs';

export async function Readme() {
  const { name, description } = pkgCwd();

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
