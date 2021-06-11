const ora = require('ora');
const { type } = require('os');
const { Text } = require('fs-chain');
const { cyan, green, red } = require('chalk');

const { download } = require('../lib/utils.cjs');

const regexp =
  /# Created by https?:\/\/(www\.)?(toptal\.com\/developers\/gitignore|gitignore\.io)\/api\/\S+[\S\s]+# End of https?:\/\/(www\.)?(toptal\.com\/developers\/gitignore|gitignore\.io)\/api\/\S+/;

const Types = {
  Windows_NT: 'windows',
  Linux: 'linux',
  Darwin: 'macos',
};

function getPlatform(context) {
  try {
    if (regexp.test(context)) {
      return [
        ...new Set([
          ...context
            .match(/gitignore\.io\/api\/(\S+)/)[1]
            .split(',')
            .filter((item) => item !== 'node'),
          Types[type()],
        ]),
      ].sort();
    }
    throw new Error('fail');
  } catch {
    return Types[type()];
  }
}

module.exports = async function gitFile() {
  await new Text()
    .source('../template/.gitattributes.tpl', __dirname)
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
      const platform = getPlatform(oldText);
      return download(`https://gitignore.io/api/node,${platform}`)
        .then((newText) => {
          const [match] = oldText.match(regexp) || [];

          return `${(match
            ? oldText.replace(regexp, newText)
            : `${oldText.trim()}\n\n${newText}`
          )
            .replace(
              /(www\.)?toptal\.com\/developers\/gitignore/g,
              'gitignore.io',
            )
            .trim()
            .split(/\n\n\+/g)
            .filter((item) => item.trim())
            .join('\n\n')}\n`;
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
};
