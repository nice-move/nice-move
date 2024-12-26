import { join } from 'node:path';

import load from '@commitlint/load';
import { eslintInspector, stylelintInspector } from '@nice-move/inspector';
import slash from 'slash';
import { expect, it } from 'vitest';

const cwd = process.cwd();

function fixPath(path) {
  return slash(path.replace(slash(cwd), '/<:root>').replace(cwd, '/<:root>'));
}

async function makeSnapshot(instance, name) {
  return expect(
    instance.then((data) => {
      data.parser &&= fixPath(data.parser);
      data.ignoreFiles &&= data.ignoreFiles.map((line) => fixPath(line));
      data.plugins &&= data.plugins.map((line) => fixPath(line));

      if (data.parserOptions?.babelOptions?.plugins) {
        data.parserOptions.babelOptions.plugins =
          data.parserOptions.babelOptions.plugins.map((line) => fixPath(line));
      }

      if (data.settings?.['import/resolver']) {
        data.settings['import/resolver'] = Object.fromEntries(
          Object.entries(data.settings['import/resolver']).map(([k, v]) => [
            fixPath(k),
            v,
          ]),
        );
      }

      if (data.settings?.['import/parsers']) {
        data.settings['import/parsers'] = Object.fromEntries(
          Object.entries(data.settings['import/parsers']).map(([k, v]) => [
            fixPath(k),
            v,
          ]),
        );
      }

      return data;
    }),
  ).resolves.toMatchFileSnapshot(join(cwd, '.snapshots', `${name}.yaml`));
}

it('should match commitlint rules snapshot', async () => {
  const io = load({
    extends: ['@nice-move/commitlint-config'],
  }).then(({ rules }) => rules);

  await makeSnapshot(io, 'commitlint');
});

it('should match eslint inspector snapshots', async () => {
  await makeSnapshot(eslintInspector('@nice-move/base', 'sample.js'), 'js');
  await makeSnapshot(
    eslintInspector('@nice-move/base', 'src/sample.js'),
    'src/js',
  );
  await makeSnapshot(
    eslintInspector('@nice-move/base', 'packages/mock/sample.js'),
    'packages/mock/js',
  );
  await makeSnapshot(eslintInspector('@nice-move/base', 'sample.ts'), 'ts');
  await makeSnapshot(eslintInspector('@nice-move/base', 'sample.cts'), 'cts');
  await makeSnapshot(eslintInspector('@nice-move/base', 'sample.mts'), 'mts');
  await makeSnapshot(eslintInspector('@nice-move/base', 'sample.html'), 'html');
  await makeSnapshot(eslintInspector('@nice-move/base', 'sample.cjs'), 'cjs');
  await makeSnapshot(eslintInspector('@nice-move/base', 'sample.mjs'), 'mjs');
  await makeSnapshot(eslintInspector('@nice-move/base', 'sample.wxs'), 'wxs');
  await makeSnapshot(eslintInspector('@nice-move/vue', 'sample.vue'), 'vue');
  await makeSnapshot(
    eslintInspector('@nice-move/vue', 'src/sample.vue'),
    'src/vue',
  );
  await makeSnapshot(eslintInspector('@nice-move/react', 'sample.jsx'), 'jsx');
  await makeSnapshot(
    eslintInspector('@nice-move/react', 'src/sample.jsx'),
    'src/jsx',
  );
  await makeSnapshot(eslintInspector('@nice-move/base', 'sample.md'), 'md');
  await makeSnapshot(
    eslintInspector('@nice-move/base', 'sample.md/o.js'),
    'md/js',
  );
  await makeSnapshot(
    eslintInspector('@nice-move/base', 'test/sample.js'),
    'test',
  );
  await makeSnapshot(
    eslintInspector('@nice-move/base', 'spec/sample.js'),
    'spec',
  );
  await makeSnapshot(
    eslintInspector('@nice-move/base', '.vitepress/config.mts'),
    'config',
  );
});

it('should match stylelint inspector snapshots', async () => {
  await makeSnapshot(stylelintInspector('test.css'), 'css');
  await makeSnapshot(stylelintInspector('test.less'), 'less');
  await makeSnapshot(stylelintInspector('test.scss'), 'scss');
  await makeSnapshot(stylelintInspector('css.module.css'), 'css.module');
});
