const centra = require('centra');
const ora = require('ora');
const { EOL, type } = require('os');
const { Text } = require('fs-chain');
const isGit = require('is-git-repository');
const execa = require('execa');
const { green, red } = require('chalk');

const regexp = /# Created by https?:\/\/(www\.)?(toptal\.com\/developers\/gitignore|gitignore\.io)\/api\/\S+[\S\s]+# End of https?:\/\/(www\.)?(toptal\.com\/developers\/gitignore|gitignore\.io)\/api\/\S+/;

function download(url) {
  return centra(url)
    .timeout(5000)
    .send()
    .then((response) => {
      if (response.statusCode === 301) {
        return download(response.headers.location);
      }
      return response.text();
    })
    .then((response) => {
      const data = response.trim();
      if (data) {
        return data;
      }
      throw new Error('template download fail');
    });
}

const Types = {
  Windows_NT: 'windows',
  Linux: 'linux',
  Darwin: 'macos',
};

function getPlatform(context = '') {
  try {
    if (regexp.test(context)) {
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

module.exports = async function git() {
  if (!isGit()) {
    const message = 'Initialized empty repository';
    await execa('git', ['init']).then(
      (io) => {
        console.log(green('√'), message);
        return io;
      },
      (error) => {
        console.log(red('×'), message);
        throw error;
      },
    );
  }

  if (isGit()) {
    await new Text()
      .source('../template/.gitattributes.tpl')
      .output('~.gitattributes')
      .logger('Create/Overwrite `.gitattributes`');

    const spinner = ora({
      text: 'Downloading template from `gitignore.io`',
    }).start();

    await new Text()
      .source('~.gitignore')
      .handle((oldText) => {
        const platform = getPlatform(oldText);
        return download(`http://gitignore.io/api/node,${platform}`).then(
          (newText) => {
            const [match] = oldText.match(regexp) || [];

            return (
              (match
                ? oldText.replace(regexp, newText)
                : oldText.trim() + EOL + EOL + newText
              )
                .replace(
                  /(www\.)?toptal\.com\/developers\/gitignore/g,
                  'gitignore.io',
                )
                .trim()
                .split(new RegExp(`${EOL + EOL}+`, 'g'))
                .filter((item) => item.trim())
                .join(EOL + EOL) + EOL
            );
          },
        );
      })
      .output()
      .then(() => {
        spinner.succeed('Create/Overwrite `.gitignore`');
      })
      .catch((error) => {
        spinner.fail(error.message);
      });
  }
};
