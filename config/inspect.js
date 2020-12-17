const configInspector = require('@nice-move/eslint-inspector');

configInspector('@nice-move/base', 'src/sample.js', 'temp/base.json');
configInspector('@nice-move/base', 'src/sample.html', 'temp/html.json');
configInspector('@nice-move/base', 'src/sample.md', 'temp/markdown.json');
configInspector('@nice-move/vue', 'src/sample.vue', 'temp/vue.json');
configInspector('@nice-move/react', 'src/sample.jsx', 'temp/react.json');
