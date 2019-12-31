const mapValues = require('lodash/mapValues');
const pickBy = require('lodash/pickBy');
const isEmpty = require('lodash/isEmpty');
const readPkg = require('read-pkg');

const {
  devDependencies: { prettier, eslint, stylelint } = {}
} = readPkg.sync();

function parse(obj) {
  const config = pickBy(
    mapValues(obj, arr => {
      const actions = arr.filter(Boolean);
      return actions.length > 0 ? actions.concat('git add') : undefined;
    })
  );
  return isEmpty(config) ? undefined : config;
}

module.exports = parse({
  '*.vue': [
    prettier && 'prettier --write',
    eslint && 'eslint --fix',
    stylelint && 'stylelint --fix --rd'
  ],
  '*.{js,jsx,mjs,cjs}': [
    prettier && 'prettier --write',
    eslint && 'eslint --fix'
  ],
  '*.{css,scss,less,md,html}': [
    prettier && 'prettier --write',
    stylelint && 'stylelint --fix --rd'
  ],
  '*.tpl': [
    prettier && 'prettier --write',
    stylelint && 'stylelint --fix --rd -s html'
  ],
  '*.{svg,json,toml,yml,yaml}': [prettier && 'prettier --write']
});
