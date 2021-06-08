#!/usr/bin/env node

const { ESLint } = require('eslint');
const pickBy = require('lodash/pickBy');
const sortKeys = require('sort-keys');
const { Json } = require('fs-chain');
const printConfig = require('stylelint/lib/printConfig.js');

function save(outputName, data) {
  return new Json()
    .config({ pretty: true })
    .onDone(() => data)
    .output(`.cache/${outputName}`)
    .catch(console.error);
}

function eslintInspector(configName, filename, outputName = '') {
  const engine = new ESLint({
    useEslintrc: false,
    baseConfig: {
      root: true,
      extends: configName,
    },
  });

  return engine
    .calculateConfigForFile(filename)
    .then((data) => {
      // eslint-disable-next-line no-param-reassign
      data.rules = pickBy(data.rules, (item) => !['off', 0].includes(item[0]));
      return sortKeys(data, { deep: true });
    })
    .then((data) => {
      if (outputName) {
        return save(outputName, data);
      }
      return data;
    });
}

function stylelintInspector(outputName) {
  printConfig({
    extends: '@nice-move/stylelint-config',
    files: ['abc.css'],
  })
    .then((data) => {
      // eslint-disable-next-line no-param-reassign
      data.rules = pickBy(data.rules, (item) => item !== null);
      const io = sortKeys(data, { deep: true });
      if (outputName) {
        return save(outputName, io);
      }
      return io;
    })
    .catch(console.error);
}

module.exports = {
  eslintInspector,
  stylelintInspector,
};

if (require.main.filename === __filename) {
  eslintInspector('@nice-move/base', 'sample.js', 'js.json');
  eslintInspector('@nice-move/base', 'sample.html', 'html.json');
  eslintInspector('@nice-move/base', 'sample.cjs', 'cjs.json');
  eslintInspector('@nice-move/base', 'sample.mjs', 'mjs.json');

  eslintInspector('@nice-move/vue', 'sample.vue', 'vue.json');
  eslintInspector('@nice-move/react', 'sample.jsx', 'jsx.json');

  eslintInspector('@nice-move/base', 'sample.md', 'md.json');
  eslintInspector('@nice-move/base', 'sample.md/o.js', 'md/js.json');
  eslintInspector('@nice-move/base', 'sample.md/o.cjs', 'md/cjs.json');
  eslintInspector('@nice-move/base', 'sample.md/o.mjs', 'md/mjs.json');

  eslintInspector('@nice-move/vue', 'sample.md/o.vue', 'md/vue.json');
  eslintInspector('@nice-move/react', 'sample.md/o.jsx', 'md/jsx.json');

  eslintInspector('@nice-move/base', 'test/sample.js', 'test.json');
  eslintInspector('@nice-move/base', 'spec/sample.js', 'spec.json');

  stylelintInspector('css.json');
}
