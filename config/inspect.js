const { CLIEngine } = require('eslint');
const sort = require('sortobject').default;
const writeJsonFile = require('write-json-file');

const baseEngine = new CLIEngine({
  useEslintrc: false,
  baseConfig: { root: true, extends: '@nice-move/base' }
});

const vueEngine = new CLIEngine({
  useEslintrc: false,
  baseConfig: { root: true, extends: '@nice-move/vue' }
});

const reactEngine = new CLIEngine({
  useEslintrc: false,
  baseConfig: { root: true, extends: '@nice-move/react' }
});

const baseConfig = baseEngine.getConfigForFile('src/sample.js');
const vueConfig = vueEngine.getConfigForFile('src/sample.vue');
const reactConfig = reactEngine.getConfigForFile('src/sample.jsx');

writeJsonFile('temp/base.json', sort(baseConfig));
writeJsonFile('temp/vue.json', sort(vueConfig));
writeJsonFile('temp/react.json', sort(reactConfig));
