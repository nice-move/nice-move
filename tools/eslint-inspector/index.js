const { ESLint } = require('eslint');
const sortObject = require('sortobject').default;
const writeJsonFile = require('write-json-file');

function save(outputName, data) {
  return writeJsonFile(outputName, data, { indent: 2 }).catch(console.error);
}

module.exports = function configInspector(
  configName,
  filename,
  outputName = '',
) {
  const engine = new ESLint({
    useEslintrc: false,
    baseConfig: {
      root: true,
      extends: configName,
    },
  });

  return engine
    .calculateConfigForFile(filename)
    .then(sortObject)
    .then((data) => {
      if (outputName) {
        return save(outputName, data);
      }
      return data;
    });
};
