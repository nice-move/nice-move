const { CLIEngine } = require('eslint');
const test = require('ava');

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

test('Pure js', t => {
  const baseConfig = baseEngine.getConfigForFile('sample.js');
  const vueConfig = vueEngine.getConfigForFile('sample.js');
  const reactConfig = reactEngine.getConfigForFile('sample.js');

  t.deepEqual(baseConfig, vueConfig);
  t.deepEqual(baseConfig, reactConfig);
});

test('Src dir', t => {
  const baseConfig = baseEngine.getConfigForFile('sample.js');
  const srcConfig = baseEngine.getConfigForFile('src/sample.js');

  t.notDeepEqual(baseConfig, srcConfig);
});

test('Base type', t => {
  const baseConfig = baseEngine.getConfigForFile('src/sample.js');
  const vueConfig = vueEngine.getConfigForFile('src/sample.vue');
  const reactConfig = reactEngine.getConfigForFile('src/sample.jsx');

  t.notDeepEqual(baseConfig, vueConfig);
  t.notDeepEqual(baseConfig, reactConfig);
  t.notDeepEqual(vueConfig, reactConfig);
});
