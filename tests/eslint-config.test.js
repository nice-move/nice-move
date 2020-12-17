const eslintInspector = require('@nice-move/eslint-inspector');
const test = require('ava').default;

const baseEngine = (filename) => eslintInspector('@nice-move/base', filename);
const vueEngine = (filename) => eslintInspector('@nice-move/vue', filename);
const reactEngine = (filename) => eslintInspector('@nice-move/react', filename);

test('Pure js', async (t) => {
  const baseConfig = await baseEngine('sample.js');
  const vueConfig = await vueEngine('sample.js');
  const reactConfig = await reactEngine('sample.js');

  t.deepEqual(baseConfig, vueConfig);
  t.deepEqual(baseConfig, reactConfig);
});

test('Html support', async (t) => {
  const baseConfig = await baseEngine('sample.js');
  const htmlConfig = await baseEngine('sample.html');

  t.notDeepEqual(baseConfig, htmlConfig);
});

test('Src dir', async (t) => {
  const baseConfig = await baseEngine('sample.js');
  const srcConfig = await baseEngine('src/sample.js');
  const vueConfig = await vueEngine('src/sample.js');
  const reactConfig = await reactEngine('src/sample.js');

  t.deepEqual(baseConfig, srcConfig);
  t.deepEqual(vueConfig, reactConfig);
  t.notDeepEqual(baseConfig, vueConfig);
  t.notDeepEqual(baseConfig, reactConfig);
});

test('Base type', async (t) => {
  const baseConfig = await baseEngine('src/sample.js');
  const vueConfig = await vueEngine('src/sample.vue');
  const reactConfig = await reactEngine('src/sample.jsx');

  t.notDeepEqual(baseConfig, vueConfig);
  t.notDeepEqual(baseConfig, reactConfig);
  t.notDeepEqual(vueConfig, reactConfig);
});
