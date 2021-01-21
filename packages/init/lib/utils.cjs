const { resolve } = require('path');
const execa = require('execa');
const { readdirSync } = require('fs');

function pkgCwd() {
  try {
    return require(resolve(process.cwd(), 'package.json'));
  } catch {
    return {};
  }
}

module.exports = {
  pkgCwd,
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
};
