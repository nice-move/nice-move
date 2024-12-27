import { createRequire } from 'node:module';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { ESLint } from 'eslint9';
import pickBy from 'lodash/pickBy.js';
import slash from 'slash';
import sortKeys from 'sort-keys';
import stylelint from 'stylelint';

const compat = new FlatCompat({
  recommendedConfig: js.configs.recommended,
});

const require = createRequire(import.meta.url);

const cwd = process.cwd();

function fixPath(path) {
  return slash(path.replace(slash(cwd), '/<:root>').replace(cwd, '/<:root>'));
}

export function eslintInspector(configName, filename) {
  const data = require('@nice-move/eslint-config-' + configName);

  const engine = new ESLint({
    overrideConfigFile: true,
    overrideConfig: compat.config(data),
  });

  return engine
    .calculateConfigForFile(filename)
    .then(({ rules, ...rest } = {}) => ({
      rules: Object.fromEntries(
        Object.entries(
          pickBy(rules, (item) => !['off', 0].includes(item[0])),
        ).map(([k, v]) => {
          if (v[0] === 2) {
            v[0] = 'error';
          }
          if (v[0] === 1) {
            v[0] = 'warn';
          }

          return [k, v];
        }),
      ),
      ...rest,
    }))
    .then(({ plugins, ...data }) => {
      if (data?.parser) {
        data.parser = fixPath(data.parser);
      }
      if (data?.plugins && Array.isArray(data.plugins)) {
        data.plugins = data.plugins.map((line) => fixPath(line));
      }
      if (data?.languageOptions?.parserOptions?.babelOptions?.plugins) {
        data.languageOptions.parserOptions.babelOptions.plugins =
          data.languageOptions.parserOptions.babelOptions.plugins.map((line) =>
            fixPath(line),
          );
      }

      if (data?.settings?.['import/resolver']) {
        data.settings['import/resolver'] = Object.fromEntries(
          Object.entries(data.settings['import/resolver']).map(([k, v]) => [
            fixPath(k),
            v,
          ]),
        );
      }

      if (data?.settings?.['import/parsers']) {
        data.settings['import/parsers'] = Object.fromEntries(
          Object.entries(data.settings['import/parsers']).map(([k, v]) => [
            fixPath(k),
            v,
          ]),
        );
      }

      return { plugins: Object.keys(plugins), ...data };
    })
    .catch((error) => {
      console.error(error);

      throw error;
    });
  // .then((data) => sortKeys(data, { deep: true }));
}

export function stylelintInspector(inputName) {
  return stylelint
    .resolveConfig(inputName)
    .then(({ rules, ignoreFiles, plugins, ...rest }) => ({
      rules: pickBy(rules, (item) => item !== null),
      ignoreFiles: ignoreFiles.map((line) => fixPath(line)),
      plugins: plugins.map((line) => fixPath(line)),
      ...rest,
    }))
    .then((data) => sortKeys(data, { deep: true }));
}
