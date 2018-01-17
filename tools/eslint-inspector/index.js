const { CLIEngine } = require('eslint');
const sortObject = require('sortobject').default;
const writeJsonFile = require('write-json-file');

function configGetter(configName) {
  const engine = new CLIEngine({
    useEslintrc: false,
    baseConfig: {
      root: true,
      extends: configName,
    },
  });

  return (filename) => {
    return engine.getConfigForFile(filename);
  };
}

function configInspector(configName) {
  const getter = configGetter(configName);

  return (filename) => {
    return sortObject(getter(filename));
  };
}

module.exports = {
  writeJson(name, data) {
    return writeJsonFile(name, data, { indent: 2 });
  },
  configGetter,
  configInspector,
};
