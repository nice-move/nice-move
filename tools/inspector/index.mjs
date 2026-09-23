import { createRequire } from 'node:module';

import { ESLint } from 'eslint';
import pickBy from 'lodash/pickBy.js';
import slash from 'slash';
import sortKeys from 'sort-keys';
import stylelint from 'stylelint';
import { relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);

const cwd = process.cwd();

function fixPath(path) {
  if (typeof path !== 'string') {
    return path;
  }

  // stylelint may return a `file:` URL (e.g. for `customSyntax`). Convert it
  // to a real filesystem path so it can be made relative to cwd; otherwise the
  // machine-specific absolute root leaks into the snapshot.
  if (path.startsWith('file:')) {
    try {
      path = fileURLToPath(path);
    } catch {
      path = path.replace(/^file:\/+/, '');
    }
  }

  let result = `root:/${slash(relative(cwd, path))}`;

  // pnpm stores packages under a content-addressable directory whose name
  // embeds a non-deterministic hash/dependency suffix (e.g.
  // `.pnpm/pkg_374038f6...` or `.pnpm/pkg@1.0.0_stylelint@17_x...`). This
  // segment varies between machines and installs, breaking snapshots, so
  // normalize it away while keeping the stable `node_modules/<pkg>` tail.
  result = result.replaceAll(
    /node_modules\/\.pnpm\/[^/]+\/node_modules\//g,
    'node_modules/',
  );

  return result;
}

export function eslintInspector(configName, filename) {
  const engine = new ESLint({
    overrideConfigFile: require.resolve(
      `@nice-move/eslint-config-${configName}`,
    ),
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

      if (data?.languageOptions) {
        if (data.languageOptions.globals) {
          for (const [key, value] of Object.entries(
            data.languageOptions.globals,
          )) {
            data.languageOptions.globals[key] =
              value === true
                ? 'writable'
                : value === false
                  ? 'readonly'
                  : value;
          }
        }

        if (data?.languageOptions.parserOptions?.babelOptions?.plugins) {
          data.languageOptions.parserOptions.babelOptions.plugins =
            data.languageOptions.parserOptions.babelOptions.plugins.map(
              (line) => fixPath(line),
            );
        }
      }

      if (data?.settings?.['import-x/resolver']) {
        data.settings['import-x/resolver'] = Object.fromEntries(
          Object.entries(data.settings['import-x/resolver']).map(([k, v]) => [
            fixPath(k),
            v,
          ]),
        );
      }

      if (data?.settings?.['import-x/parsers']) {
        data.settings['import-x/parsers'] = Object.fromEntries(
          Object.entries(data.settings['import-x/parsers']).map(([k, v]) => [
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
    .then(({ rules, ignoreFiles, plugins, customSyntax, ...rest }) => ({
      rules: pickBy(rules, (item) => item !== null),
      ignoreFiles: ignoreFiles.map((line) => fixPath(line)),
      plugins: plugins.map((line) => fixPath(line)),
      ...(customSyntax && { customSyntax: fixPath(customSyntax) }),
      ...rest,
    }))
    .then((data) => sortKeys(data, { deep: true }));
}
