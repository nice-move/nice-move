const { readFileSync } = require('fs');
const { resolve } = require('path');
const { render } = require('micromustache');

const regexp = /# Created by https?:\/\/(www\.)?(toptal\.com\/developers\/gitignore|gitignore\.io)\/api\/\S+[\S\s]+# End of https?:\/\/(www\.)?(toptal\.com\/developers\/gitignore|gitignore\.io)\/api\/\S+/;

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

module.exports = {
  pkgCwd,
  readTemplate,
  regexp,
};
