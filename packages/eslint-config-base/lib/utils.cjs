const { resolve } = require('path');

function isSafeError(error) {
  return (
    error.code === 'MODULE_NOT_FOUND' && error.requireStack[0] === __filename
  );
}

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
    if (!isSafeError(error)) {
      throw error;
    }
  }
}

function pkgHas(checker, getResult) {
  const pkg = safeGet(resolve(process.cwd(), 'package.json'));
  if (checker(pkg)) {
    return getResult();
  }
}

module.exports = { pkgHas, safeGet, existThenReturn };
