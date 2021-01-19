const { resolve } = require('path');

const regexp = /# Created by https?:\/\/(www\.)?(toptal\.com\/developers\/gitignore|gitignore\.io)\/api\/\S+[\S\s]+# End of https?:\/\/(www\.)?(toptal\.com\/developers\/gitignore|gitignore\.io)\/api\/\S+/;

function pkgCwd() {
  try {
    return require(resolve(process.cwd(), 'package.json'));
  } catch {
    return {};
  }
}

module.exports = {
  pkgCwd,
  regexp,
};
