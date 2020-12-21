const mapValues = require('lodash/mapValues');
const pickBy = require('lodash/pickBy');
const isEmpty = require('lodash/isEmpty');

const lintStaged = require('lint-staged');
const { yellow } = require('chalk');

const { isInstalled } = require('./lib/utils.cjs');
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

module.exports = function lint({ shell }) {
  const prettier = isInstalled('prettier/package.json');
  const eslint = isInstalled('eslint/package.json');
  const stylelint = isInstalled('stylelint/package.json');

  if (stylelint) {
    action();
  }

  const config = parse({
    '*.{vue,html,md}': [
      prettier && 'prettier --write',
      stylelint && 'stylelint --fix --rd --risd',
      eslint && 'eslint --fix --format=pretty',
    ],
    '*.{js,jsx,mjs,cjs}': [
      prettier && 'prettier --write',
      eslint && 'eslint --fix --format=pretty',
    ],
    '*.{css,scss,less,xml}': [
      prettier && 'prettier --write',
      stylelint && 'stylelint --fix --rd --risd',
    ],
    '{*.{json,svg},*.{to,y,ya}ml,.{babel,npm}rc,.editorconfig}': [
      prettier && 'prettier --write',
    ],
    'yarn.lock': [
      `replace-in-file --configFile="${yarnConfig}"`,
      'yarn-deduplicate',
    ],
  });

  if (!config) {
    console.log(yellow`nice-move:`, "Can't find `eslint/stylelint/prettier`.");
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  }

  lintStaged({
    allowEmpty: true,
    concurrent: true,
    config,
    cwd: process.cwd(),
    debug: false,
    maxArgLength: getMaxArgLength() / 2,
    quiet: false,
    relative: false, // process.cwd(),
    shell: !!shell,
    stash: true,
  })
    .then((passed) => {
      process.exitCode = passed ? 0 : 1;
    })
    .catch(() => {
      process.exitCode = 1;
    });
};
