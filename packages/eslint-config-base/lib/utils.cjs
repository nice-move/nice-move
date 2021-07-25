'use strict';

const { resolve } = require('path');

function isSafeError(error) {
  return (
    error.code === 'MODULE_NOT_FOUND' && error.requireStack[0] === __filename
  );
}

// eslint-disable-next-line consistent-return
function existThenReturn(checker, getResult) {
  try {
    require.resolve(checker);
    return getResult();
  } catch (error) {
    if (!isSafeError(error)) {
      throw error;
    }
  }
}

function safeGet(name) {
  try {
    return require(name);
  } catch (error) {
    if (isSafeError(error)) {
      return {};
    }
    throw error;
  }
}

const cwd = process.cwd();

const pkg = safeGet(resolve(cwd, 'package.json'));

// eslint-disable-next-line consistent-return
function pkgHas(checker, getResult) {
  const io = checker(pkg);
  if (io) {
    return getResult(io, pkg);
  }
}

function configHas(checker, getResult) {
  return pkgHas(({ 'nice-move': config = {} }) => checker(config), getResult);
}

// eslint-disable-next-line consistent-return
function projectHasConfig(getResult) {
  const config = safeGet(resolve(cwd, 'project.config.json'));
  if (config.appid) {
    return getResult(config);
  }
}

module.exports = {
  configHas,
  pkgHas,
  safeGet,
  existThenReturn,
  projectHasConfig,
  matches: {
    sourceAndPackages: '{src,packages/*}/**',
    source: 'src/**',
  },
};
