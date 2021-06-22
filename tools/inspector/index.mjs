import { ESLint } from 'eslint';
import { Json } from 'fs-chain';
import pickBy from 'lodash/pickBy.js';
import sortKeys from 'sort-keys';
import printConfig from 'stylelint/lib/printConfig.js';

function save(outputName, data) {
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
    .then((data) => {
      // eslint-disable-next-line no-param-reassign
      data.rules = pickBy(data.rules, (item) => !['off', 0].includes(item[0]));
      return sortKeys(data, { deep: true });
    })
    .then((data) => {
      if (outputName) {
        return save(outputName, data);
      }
      return data;
    });
}

export function stylelintInspector(outputName) {
  printConfig({
    extends: '@nice-move/stylelint-config',
    files: ['abc.css'],
  })
    .then((data) => {
      // eslint-disable-next-line no-param-reassign
      data.rules = pickBy(data.rules, (item) => item !== null);
      const io = sortKeys(data, { deep: true });
      if (outputName) {
        return save(outputName, io);
      }
      return io;
    })
    .catch(console.error);
}
