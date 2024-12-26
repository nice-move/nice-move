import { ESLint } from 'eslint';
import pickBy from 'lodash/pickBy.js';
import sortKeys from 'sort-keys';
import stylelint from 'stylelint';

export function eslintInspector(configName, filename) {
  const engine = new ESLint({
    useEslintrc: false,
    baseConfig: {
      root: true,
      extends: configName,
    },
  });

  return engine
    .calculateConfigForFile(filename)
    .then(({ rules, ...rest }) => ({
      rules: pickBy(rules, (item) => !['off', 0].includes(item[0])),
      ...rest,
    }))
    .then((data) => sortKeys(data, { deep: true }));
}

export function stylelintInspector(inputName) {
  return stylelint
    .resolveConfig(inputName)
    .then(({ rules, ...rest }) => ({
      rules: pickBy(rules, (item) => item !== null),
      ...rest,
    }))
    .then((data) => sortKeys(data, { deep: true }));
}
