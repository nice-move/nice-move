const { resolve } = require('path');

const lintStaged = require('lint-staged');

const { action } = require('./patch/stylelint.cjs');

function parse(obj) {
  const io = Object.entries(obj)
    .map(([key, value]) => [key, value.filter(Boolean)])
    // eslint-disable-next-line no-unused-vars
    .filter(([key, value]) => value.length);

  return io.length > 0 ? Object.fromEntries(io) : undefined;
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
  const rustywind = 'rustywind' in dependencies;

  const useColor = process.stdin.isTTY ? ' --color' : '';

  const config = parse({
    '*.{vue,html,md}': [
      rustywind && 'rustywind --write',
      garou && 'garou',
      prettier && `prettier --write${useColor}`,
      stylelint &&
        `stylelint --fix --custom-formatter=node_modules/stylelint-formatter-pretty${useColor}`,
      eslint && `eslint --fix --format=pretty${useColor}`,
    ],
    '*.{js,jsx,mjs,cjs}': [
      rustywind && 'rustywind --write',
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
};
