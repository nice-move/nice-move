const { configGetter } = require('@nice-move/eslint-inspector');
const test = require('ava');

const baseEngine = configGetter('@nice-move/base');
const vueEngine = configGetter('@nice-move/vue');
const reactEngine = configGetter('@nice-move/react');

test('Pure js', (t) => {
  const baseConfig = baseEngine('sample.js');
  const vueConfig = vueEngine('sample.js');
  const reactConfig = reactEngine('sample.js');

  t.deepEqual(baseConfig, vueConfig);
  t.deepEqual(baseConfig, reactConfig);
});

test('Html support', (t) => {
  const baseConfig = baseEngine('sample.js');
  const htmlConfig = baseEngine('sample.html');

  t.notDeepEqual(baseConfig, htmlConfig);
});

test('Src dir', (t) => {
  const baseConfig = baseEngine('sample.js');
  const srcConfig = baseEngine('src/sample.js');
  const vueConfig = vueEngine('src/sample.js');
  const reactConfig = reactEngine('src/sample.js');

  t.deepEqual(baseConfig, srcConfig);
  t.deepEqual(vueConfig, reactConfig);
  t.notDeepEqual(baseConfig, vueConfig);
  t.notDeepEqual(baseConfig, reactConfig);
});

test('Base type', (t) => {
  const baseConfig = baseEngine('src/sample.js');
  const vueConfig = vueEngine('src/sample.vue');
  const reactConfig = reactEngine('src/sample.jsx');

  t.notDeepEqual(baseConfig, vueConfig);
  t.notDeepEqual(baseConfig, reactConfig);
  t.notDeepEqual(vueConfig, reactConfig);
});
