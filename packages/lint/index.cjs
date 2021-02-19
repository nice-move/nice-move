const mapValues = require('lodash/mapValues');
const pickBy = require('lodash/pickBy');
const isEmpty = require('lodash/isEmpty');
const { resolve } = require('path');

const lintStaged = require('lint-staged');
const { yellow } = require('chalk');

const { action } = require('./patch/stylelint.cjs');

function parse(obj) {
  const config = pickBy(
    mapValues(obj, (arr) => arr.filter(Boolean)),
    (arr) => arr.length > 0,
  );
  return isEmpty(config) ? undefined : config;
}

function getMaxArgLength() {
  switch (process.platform) {
    case 'darwin':
      return 262144;
    case 'win32':
      return 8191;
    default:
      return 131072;
  }
}

const yarnConfig = require.resolve('./lib/yarn.cjs');

function getDependencies() {
  try {
    return require(resolve(process.cwd(), 'package.json')).devDependencies;
  } catch {
    return {};
  }
}

module.exports = function lint({ shell }) {
  const dependencies = getDependencies();

  const prettier = 'prettier' in dependencies;
  const eslint = 'eslint' in dependencies;
  const stylelint = 'stylelint' in dependencies;
  const garou = 'garou' in dependencies;

  const useColor = process.stdin.isTTY ? ' --color' : '';

  const config = parse({
    '*.{vue,html,md}': [
      garou && 'garou',
      prettier && `prettier --write${useColor}`,
      stylelint &&
        `stylelint --fix --custom-formatter=node_modules/stylelint-formatter-pretty${useColor}`,
      eslint && `eslint --fix --format=pretty${useColor}`,
    ],
    '*.{js,jsx,mjs,cjs}': [
      garou && 'garou',
      prettier && `prettier --write${useColor}`,
      eslint && `eslint --fix --format=pretty${useColor}`,
    ],
    '*.{css,scss,less,xml}': [
      garou && 'garou',
      prettier && `prettier --write${useColor}`,
      stylelint &&
        `stylelint --fix --custom-formatter=node_modules/stylelint-formatter-pretty${useColor}`,
    ],
    '{*.{json,svg},*.{to,y,ya}ml,.{babel,npm}rc,.editorconfig}': [
      prettier && `prettier --write${useColor}`,
    ],
    'yarn.lock': [
      `replace-in-file --configFile="${yarnConfig}"${useColor}`,
      'yarn-deduplicate',
    ],
  });

  if (!config) {
    console.log(yellow`nice-move:`, "Can't find `eslint/stylelint/prettier`.");
    process.exitCode = 1;
  } else {
    if (stylelint) {
      action();
    }

    lintStaged({
      allowEmpty: true,
      concurrent: true,
      config,
      cwd: process.cwd(),
      debug: false,
      maxArgLength: getMaxArgLength() / 2,
      quiet: false,
      relative: false,
      shell: !!shell,
      stash: true,
    })
      .then((passed) => {
        process.exitCode = passed ? 0 : 1;
      })
      .catch(() => {
        process.exitCode = 1;
      });
  }
};
