const mapValues = require('lodash/mapValues');
const pickBy = require('lodash/pickBy');
const isEmpty = require('lodash/isEmpty');
const readPkg = require('read-pkg');

function pkg() {
  try {
    const { dependencies, devDependencies } = readPkg.sync();
    return { ...dependencies, ...devDependencies };
  } catch {
    return {};
  }
}

const { prettier, eslint, stylelint } = pkg();

function parse(obj) {
  const config = pickBy(
    mapValues(obj, arr => arr.filter(Boolean)),
    arr => arr.length > 0
  );
  return isEmpty(config) ? undefined : config;
}

module.exports = parse({
  '*.{vue,html}': [
    prettier && 'prettier --write',
    stylelint && 'stylelint --fix --rd',
    eslint && 'eslint --fix'
  ],
  '*.{js,jsx,mjs,cjs}': [
    prettier && 'prettier --write',
    eslint && 'eslint --fix'
  ],
  '*.{css,scss,less,md}': [
    prettier && 'prettier --write',
    stylelint && 'stylelint --fix --rd'
  ],
  '*.tpl': [
    prettier && 'prettier --write',
    stylelint && 'stylelint --fix --rd -s html',
    eslint && 'eslint --fix'
  ],
  '*.{svg,json,toml,yml,yaml}': [prettier && 'prettier --write']
});
