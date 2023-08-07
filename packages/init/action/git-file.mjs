import { type } from 'node:os';

import { Text } from 'fs-chain';
import ora from 'ora';

import { cyan, green, red } from '../lib/color.mjs';
import { download } from '../lib/utils.mjs';
import gitattributes from '../template/.gitattributes.txt';

const Types = {
  Windows_NT: 'windows',
  Linux: 'linux',
  Darwin: 'macos',
};

export async function GitFile() {
  await new Text()
    .onDone(() => gitattributes)
    .output('.gitattributes')
    .logger('Create/Overwrite', cyan('.gitattributes'));

  const spinner = ora({
    text: 'Downloading template from `gitignore.io`',
  }).start();

  const message = `Create/Overwrite ${cyan('.gitignore')}`;

  return new Text()
    .source('.gitignore')
    .onFail()
    .onDone((oldText = '') => {
      const platform = Types[type()];

      return download(
        `https://gitignore.io/api/ssh,certificates,node,${platform}`,
      )
        .then((newText) => {
          const io = newText
            .replaceAll(
              /(www\.)?toptal\.com\/developers\/gitignore/g,
              'gitignore.io',
            )
            .trim();

          return `${io}\n`;
        })
        .catch(() => oldText || 'node_modules\n');
    })
    .output()
    .then(() => {
      spinner.stopAndPersist({
        symbol: green('√'),
        text: message,
      });
    })
    .catch((error) => {
      spinner.stopAndPersist({
        symbol: red('×'),
        text: `${message} - ${error.message}`,
      });
    });
}
