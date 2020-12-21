function isInstalled(pkgName) {
  try {
    require.resolve(pkgName);
    return true;
  } catch {
    return false;
  }
}

module.exports = {
  isInstalled,
};
