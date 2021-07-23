#!/usr/bin/env node

import { eslintInspector, stylelintInspector } from './index.mjs';

eslintInspector('@nice-move/base', 'sample.js', 'js.json');
eslintInspector('@nice-move/base', 'src/sample.js', 'src/js.json');

eslintInspector(
  '@nice-move/base',
  'packages/mock/sample.js',
  'packages/mock/js.json',
);

eslintInspector('@nice-move/base', 'sample.ts', 'ts.json');
eslintInspector('@nice-move/base', 'sample.html', 'html.json');
eslintInspector('@nice-move/base', 'sample.cjs', 'cjs.json');
eslintInspector('@nice-move/base', 'sample.mjs', 'mjs.json');

eslintInspector('@nice-move/vue', 'sample.vue', 'vue.json');
eslintInspector('@nice-move/vue', 'src/sample.vue', 'src/vue.json');
eslintInspector('@nice-move/react', 'sample.jsx', 'jsx.json');
eslintInspector('@nice-move/react', 'src/sample.jsx', 'src/jsx.json');

eslintInspector('@nice-move/base', 'sample.md', 'md.json');
eslintInspector('@nice-move/base', 'sample.md/o.js', 'md/js.json');

eslintInspector('@nice-move/base', 'test/sample.js', 'test.json');
eslintInspector('@nice-move/base', 'spec/sample.js', 'spec.json');

stylelintInspector('css.json');
