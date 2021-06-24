import { Text } from 'fs-chain';

import { cyan } from '../lib/color.mjs';
import { getAuthorName, pkgCwd } from '../lib/utils.mjs';

export function License() {
  const { license, author = '' } = pkgCwd();

  const isMIT = license === 'MIT';

  if (isMIT || license === 'Unlicense') {
    return new Text()
      .source(
        isMIT ? '../../template/mit.tpl' : '../../template/unlicense.tpl',
        import.meta.url,
      )
      .onDone((text) =>
        isMIT
          ? text
              .replace('{{year}}', new Date().getFullYear())
              .replace('{{holder}}', getAuthorName(author))
          : text,
      )
      .output('LICENSE')
      .logger('Create/Overwrite', cyan('LICENSE'))
      .catch(console.warn);
  }
}
