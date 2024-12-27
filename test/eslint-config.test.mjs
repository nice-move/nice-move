import { eslintInspector } from '@nice-move/inspector';
import { describe, expect, it } from 'vitest';

const baseEngine = (filename) => eslintInspector('base', filename);
const vueEngine = (filename) => eslintInspector('vue', filename);
const reactEngine = (filename) => eslintInspector('react', filename);

describe('ESLint Config Tests', () => {
  it('Pure js', async () => {
    const baseConfig = await baseEngine('sample.js');
    const vueConfig = await vueEngine('sample.js');
    const reactConfig = await reactEngine('sample.js');

    expect(baseConfig).toEqual(vueConfig);
    expect(baseConfig).not.toEqual(reactConfig);
  });

  it('Html support', async () => {
    const baseConfig = await baseEngine('sample.js');
    const htmlConfig = await baseEngine('sample.html');

    expect(baseConfig).not.toEqual(htmlConfig);
  });

  it('Environment', async () => {
    const jsConfig = await baseEngine('sample.js');
    const cjsConfig = await baseEngine('sample.cjs');
    const mjsConfig = await baseEngine('sample.mjs');

    expect(jsConfig).not.toEqual(cjsConfig);
    expect(jsConfig).not.toEqual(mjsConfig);
    expect(cjsConfig).not.toEqual(mjsConfig);
  });

  it('Base type', async () => {
    const baseConfig = await baseEngine('src/sample.js');
    const vueConfig = await vueEngine('src/sample.vue');
    const reactConfig = await reactEngine('src/sample.jsx');

    expect(baseConfig).not.toEqual(vueConfig);
    expect(baseConfig).not.toEqual(reactConfig);
    expect(vueConfig).not.toEqual(reactConfig);
  });

  it('Dir depth', async () => {
    expect(await baseEngine('sample.js')).not.toEqual(
      await baseEngine('src/sample.js'),
    );

    expect(await baseEngine('src/sample.js')).toEqual(
      await baseEngine('src/abc/sample.js'),
    );

    expect(await baseEngine('src/abc/sample.js')).toEqual(
      await baseEngine('src/abc/efg/sample.js'),
    );
  });
});
