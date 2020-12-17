#!/usr/bin/env node

const { ESLint } = require('eslint');
const sortObject = require('sortobject').default;
const writeJsonFile = require('write-json-file');

function save(outputName, data) {
  return writeJsonFile(outputName, data, { indent: 2 }).catch(console.error);
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
    .then(sortObject)
    .then((data) => {
      if (outputName) {
        return save(outputName, data);
      }
      return data;
    });
}

module.exports = eslintInspector;

if (require.main.filename === __filename) {
  eslintInspector('@nice-move/base', 'sample.js', '.cache/base.json');
  eslintInspector('@nice-move/base', 'sample.html', '.cache/html.json');
  eslintInspector('@nice-move/base', 'sample.md', '.cache/markdown.json');
  eslintInspector('@nice-move/vue', 'sample.vue', '.cache/vue.json');
  eslintInspector('@nice-move/react', 'sample.jsx', '.cache/react.json');
}
