import { Text } from 'fs-chain';

import { cyan } from '../lib/color.mjs';
import { getAuthorName, getPkg } from '../lib/utils.mjs';
import mit from '../template/mit.txt';
import unlicense from '../template/unlicense.txt';

export async function License() {
  const { license, author = '' } = getPkg();

  const isMIT = license === 'MIT';

  if (isMIT || license === 'Unlicense') {
    const holder = await getAuthorName(author);

    return new Text()
      .onDone(() =>
        isMIT
          ? mit
              .replace('{{year}}', new Date().getFullYear())
              .replace('{{holder}}', holder)
          : unlicense,
      )
      .output('LICENSE')
      .logger('Create/Overwrite', cyan('LICENSE'))
      .catch(console.warn);
  }
}
