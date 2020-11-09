const centra = require('centra');
const ora = require('ora');
const { EOL, type } = require('os');
const { readFileSync } = require('fs');
const { resolve } = require('path');
const { Text } = require('fs-chain');

const { regexp } = require('../../lib');

const Types = {
  Windows_NT: 'windows',
  Linux: 'linux',
  Darwin: 'macos',
};

const ignorePath = resolve(process.cwd(), '.gitignore');

function get(url) {
  return centra(url)
    .timeout(5000)
    .send()
    .then((response) => {
      if (response.statusCode === 301) {
        return get(response.headers.location);
      }
      return response;
    });
}

function getPlatform() {
  try {
    const context = readFileSync(ignorePath, 'utf8');
    if (context.match(regexp)) {
      return [
        ...new Set(
          context
            .match(/gitignore\.io\/api\/(\S+)/)[1]
            .split(',')
            .filter((item) => item !== 'node')
            .concat(Types[type()]),
        ),
      ].sort();
    }
    throw new Error('fail');
  } catch {
    return Types[type()];
  }
}

function BestShot() {
  try {
    const {
      git = [],
      // @ts-ignore
      // eslint-disable-next-line global-require, import/no-unresolved
    } = require('@best-shot/cli/config/ignore.json');
    return ['# best-shot', ...git, '# best-shot'].join(EOL);
  } catch {
    return '';
  }
}

function download(platform) {
  return get(`http://gitignore.io/api/node,${platform}`)
    .then((response) => response.text())
    .then((text) => {
      const data = text.trim();
      if (data) {
        return data;
      }
      throw new Error('template download fail');
    });
}

function convert(newText) {
  return (oldText) => {
    const [match] = oldText.match(regexp) || [];

    const pure = (match
      ? oldText.replace(regexp, newText)
      : oldText.trim() + EOL + EOL + newText
    )
      .replace(/www\.toptal\.com\/developers\/gitignore/g, 'gitignore.io')
      .trim();

    const bestShotText = BestShot();

    return (
      (bestShotText
        ? pure
            .replace(/#\s?best-shot[\S\s]*#\s?best-shot\s*/, '')
            .replace(
              '# End of https://gitignore.io/api/node,windows',
              `# End of https://gitignore.io/api/node,windows${
                EOL + EOL + bestShotText + EOL + EOL
              }`,
            )
        : pure
      )
        .split(new RegExp(`${EOL + EOL}+`, 'g'))
        .filter((item) => item.trim())
        .join(EOL + EOL) + EOL
    );
  };
}

module.exports = function gitignore() {
  const spinner = ora({
    prefixText: 'nice-move',
    text: 'Downloading template from `gitignore.io`',
  }).start();

  const platform = getPlatform();

  return download(platform)
    .then(convert)
    .then((handler) => {
      new Text().source(ignorePath).handle(handler).output();
      spinner.succeed('Created `.gitignore` by `gitignore.io`');
    })
    .catch((error) => {
      spinner.fail(error.message);
    });
};
