const { resolve } = require('path');
const execa = require('execa');
const { readdirSync } = require('fs');
const centra = require('centra');
const stringify = require('stringify-author');
const { sep } = require('path');

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

module.exports = {
  download,
  pkgCwd() {
    try {
      return require(resolve(process.cwd(), 'package.json'));
    } catch {
      return {};
    }
  },
  async gitSupport() {
    try {
      const { stdout } = await execa('git', ['--version']);
      return !!stdout;
    } catch {
      return false;
    }
  },
  emptyDir() {
    return readdirSync(process.cwd()).length === 0;
  },
  getAuthor(author = {}) {
    const meta = require('user-meta');

    const io = meta.name ? stringify(meta) : undefined;

    if (typeof author === 'string') {
      return author || io || 'Unknown';
    }

    return (author.name ? stringify(author) : io) || 'Unknown';
  },
  getAuthorName(author = {}) {
    const { name } = require('user-meta');
    return (typeof author === 'string' ? author : author.name)
      ? name
      : 'Unknown';
  },
  trim(value) {
    return value ? value.trim() : undefined;
  },
  dirname(path) {
    return path.split(sep).slice(-1)[0].trim();
  },
};
