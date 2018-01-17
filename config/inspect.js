const { configInspector } = require('@nice-move/eslint-inspector');

const writeJsonFile = require('write-json-file');

const baseInspector = configInspector('@nice-move/base');
const vueInspector = configInspector('@nice-move/vue');
const reactInspector = configInspector('@nice-move/react');

const baseConfig = baseInspector('src/sample.js');
const htmlConfig = baseInspector('src/sample.html');
const vueConfig = vueInspector('src/sample.vue');
const reactConfig = reactInspector('src/sample.jsx');

writeJsonFile('temp/base.json', baseConfig);
writeJsonFile('temp/html.json', htmlConfig);
writeJsonFile('temp/vue.json', vueConfig);
writeJsonFile('temp/react.json', reactConfig);
