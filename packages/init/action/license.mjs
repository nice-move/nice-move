import { Text } from 'fs-chain';
import { getPkg } from 'settingz';

import { cyan } from '../lib/color.mjs';
import { getAuthorName } from '../lib/utils.mjs';

export async function License() {
  const { license, author = '' } = getPkg();

  const isMIT = license === 'MIT';

  if (isMIT || license === 'Unlicense') {
    const holder = await getAuthorName(author);

    return new Text()
      .source(
        isMIT ? '../../template/mit.tpl' : '../../template/unlicense.tpl',
        import.meta.url,
      )
      .onDone((text) =>
        isMIT
          ? text
              .replace('{{year}}', new Date().getFullYear())
              .replace('{{holder}}', holder)
          : text,
      )
      .output('LICENSE')
      .logger('Create/Overwrite', cyan('LICENSE'))
      .catch(console.warn);
  }
}
