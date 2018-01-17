const { configInspector, writeJson } = require('@nice-move/eslint-inspector');

const baseInspector = configInspector('@nice-move/base');
const vueInspector = configInspector('@nice-move/vue');
const reactInspector = configInspector('@nice-move/react');

const baseConfig = baseInspector('src/sample.js');
const htmlConfig = baseInspector('src/sample.html');
const markdownConfig = baseInspector('src/sample.md');
const vueConfig = vueInspector('src/sample.vue');
const reactConfig = reactInspector('src/sample.jsx');

writeJson('temp/base.json', baseConfig);
writeJson('temp/html.json', htmlConfig);
writeJson('temp/markdown.json', markdownConfig);
writeJson('temp/vue.json', vueConfig);
writeJson('temp/react.json', reactConfig);
