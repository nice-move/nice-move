const { EOL } = require('os');
const ora = require('ora');
const { Text, Json } = require('fs-chain');
const username = require('git-username');
const deepmerge = require('deepmerge');
const isThere = require('is-there');
const osLocale = require('os-locale');

const {
  download,
  getPlatform,
  ignorePath,
  pkgCwd,
  readTemplate,
  regexp,
} = require('../lib');

exports.command = 'init';

exports.describe = 'Initialize your workspaces';

function BestShot() {
  try {
    const {
      git = [],
      // eslint-disable-next-line global-require, import/no-unresolved
    } = require('@best-shot/cli/config/ignore.json');
    return ['# best-shot', ...git, '# best-shot'].join(EOL);
  } catch {
    return '';
  }
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

exports.handler = () => {
  osLocale()
    .then((locale) => {
      if (locale === 'zh-CN') {
        isThere.file('./.npmrc', (exists) => {
          if (exists) {
            new Text()
              .source('./.npmrc')
              .cutout((text) =>
                text.match(
                  /registry\s?=\s?https:\/\/registry\.npm\.taobao\.org/,
                ),
              )
              .handle(
                (text) => `registry = https://registry.npm.taobao.org\r${text}`,
              )
              .output();
          }
        });

        isThere.file('./.yarnrc', (exists) => {
          if (exists) {
            new Text()
              .source('./.yarnrc')
              .cutout((text) =>
                text.match(/registry\s"https:\/\/registry\.npm\.taobao\.org"/),
              )
              .handle(
                (text) => `registry "https://registry.npm.taobao.org"\r${text}`,
              )
              .output();
          }
        });
      }
    })
    .catch(() => {});

  new Json()
    .source('./package.json')
    .config({ pretty: true })
    .handle((pkg) =>
      deepmerge(pkg, {
        scripts: {
          format: 'nice-move lint',
        },
        devDependencies: {
          eslint: '^6.8.0',
          prettier: '^2.1.1',
          stylelint: '^13.6.1',
        },
        eslintConfig: {
          extends: '@nice-move/eslint-config-base',
        },
        prettier: '@nice-move/prettier-config',
        stylelint: {
          extends: '@nice-move/stylelint-config',
        },
      }),
    )
    .output();

  new Text()
    .source('./.editorconfig')
    .cutout((context) => context.trim() !== '')
    .handle(() => readTemplate('.editorconfig'))
    .output();

  new Text()
    .source('./.gitattributes')
    .cutout((context) => context.trim() !== '')
    .handle(() => readTemplate('.gitattributes'))
    .output();

  const { license, private: isPrivate, author = '' } = pkgCwd();

  if (license === 'MIT') {
    new Text()
      .handle(() =>
        readTemplate('mit', {
          year: new Date().getFullYear(),
          holder: author.name || username(),
        }),
      )
      .output('./LICENSE');
  } else if (license === 'UNLICENSE' && !isPrivate) {
    new Text().handle(() => readTemplate('unlicense')).output('./LICENSE');
  }

  const spinner = ora({
    prefixText: 'nice-move',
    text: 'Downloading template from `gitignore.io`',
  }).start();

  const platform = getPlatform();

  download(platform)
    .then(convert)
    .then((handler) => {
      new Text().source(ignorePath).handle(handler).output();
      spinner.succeed('Created `.gitignore` by `gitignore.io`');
    })
    .catch((error) => {
      spinner.fail(error.message);
    });
};
