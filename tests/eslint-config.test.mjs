import { eslintInspector } from '@nice-move/inspector';
import test from 'ava';

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

test('Environment', async (t) => {
  const jsConfig = await baseEngine('sample.js');
  const cjsConfig = await baseEngine('sample.cjs');
  const mjsConfig = await baseEngine('sample.mjs');

  t.notDeepEqual(jsConfig, cjsConfig);
  t.notDeepEqual(jsConfig, mjsConfig);
  t.notDeepEqual(cjsConfig, mjsConfig);
});

test('Base type', async (t) => {
  const baseConfig = await baseEngine('src/sample.js');
  const vueConfig = await vueEngine('src/sample.vue');
  const reactConfig = await reactEngine('src/sample.jsx');

  t.notDeepEqual(baseConfig, vueConfig);
  t.notDeepEqual(baseConfig, reactConfig);
  t.notDeepEqual(vueConfig, reactConfig);
});

test('Dir depth', async (t) => {
  t.deepEqual(
    //-
    await baseEngine('sample.js'),
    await baseEngine('src/sample.js'),
  );

  t.deepEqual(
    await baseEngine('src/sample.js'),
    await baseEngine('src/abc/sample.js'),
  );

  t.deepEqual(
    await baseEngine('src/abc/sample.js'),
    await baseEngine('src/abc/efg/sample.js'),
  );

  t.deepEqual(
    await vueEngine('src/sample.vue'),
    await vueEngine('src/abc/sample.vue'),
  );

  t.deepEqual(
    await reactEngine('src/sample.jsx'),
    await reactEngine('src/abc/sample.jsx'),
  );
});
