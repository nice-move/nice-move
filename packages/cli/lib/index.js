const centra = require('centra');
const { type } = require('os');
const { readFileSync } = require('fs');
const { resolve } = require('path');
const { render } = require('micromustache');

const ignorePath = resolve(process.cwd(), '.gitignore');

const regexp = /# Created by https?:\/\/(www\.)?(toptal\.com\/developers\/gitignore|gitignore\.io)\/api\/\S+[\S\s]+# End of https?:\/\/(www\.)?(toptal\.com\/developers\/gitignore|gitignore\.io)\/api\/\S+/;

const Types = {
  Windows_NT: 'windows',
  Linux: 'linux',
  Darwin: 'macos',
};

function pkgCwd() {
  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    return require(resolve(process.cwd(), 'package.json'));
  } catch {
    return {};
  }
}

function readTemplate(name, params) {
  const data = readFileSync(
    resolve(__dirname, '../template', `${name}.tpl`),
    'utf8',
  );

  return params ? render(data, params) : data;
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

module.exports = {
  download,
  getPlatform,
  ignorePath,
  pkgCwd,
  readTemplate,
  regexp,
};
