import { ESLint } from 'eslint';
import { Json } from 'fs-chain';
import pickBy from 'lodash/pickBy.js';
import sortKeys from 'sort-keys';
import stylelint from 'stylelint';

export function save(outputName, data) {
  return new Json()
    .config({ pretty: true })
    .onDone(() => data)
    .output(`.cache/${outputName}`)
    .catch(console.error);
}

export function eslintInspector(configName, filename, outputName = '') {
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
    .then((data) => sortKeys(data, { deep: true }))
    .then((data) => {
      if (outputName) {
        return save(outputName, data);
      }

      return data;
    });
}

export function stylelintInspector(inputName, outputName) {
  stylelint
    .resolveConfig(inputName)
    .then(({ rules, ...rest }) => ({
      rules: pickBy(rules, (item) => item !== null),
      ...rest,
    }))
    .then((data) => {
      const io = sortKeys(data, { deep: true });

      if (outputName) {
        return save(outputName, io);
      }

      return io;
    })
    .catch(console.error);
}
