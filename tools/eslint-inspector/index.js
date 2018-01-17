const { CLIEngine } = require('eslint');
const sortObject = require('sortobject').default;

function configGetter(e) {
  const engine = new CLIEngine({
    useEslintrc: false,
    baseConfig: {
      root: true,
      extends: e
    }
  });

  return filename => {
    return engine.getConfigForFile(filename);
  };
}

function configInspector(e) {
  const getter = configGetter(e);

  return filename => {
    return sortObject(getter(filename));
  };
}

module.exports = {
  configGetter,
  configInspector
};
