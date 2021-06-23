import lintStaged from 'lint-staged';
import { createRequire } from 'module';
import { resolve } from 'path';
import compareVersions from 'tiny-version-compare';
import { fileURLToPath } from 'url';

import { action } from './patch/stylelint.mjs';

function parse(obj) {
  const io = Object.entries(obj)
    .map(([key, value]) => [key, value.filter(Boolean)])
    .filter(([_, value]) => value.length);

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

const yarnConfig = resolve(fileURLToPath(import.meta.url), '../lib/yarn.cjs');

const requireJson = createRequire(`${process.cwd()}/`);

function readJson() {
  try {
    return requireJson('./package.json');
  } catch (error) {
    console.error(error);
    return {};
  }
}

function getDependencies() {
  const { devDependencies = {} } = readJson();

  const prettier = 'prettier' in devDependencies;
  const eslint = 'eslint' in devDependencies;
  const stylelint = 'stylelint' in devDependencies;
  const garou = 'garou' in devDependencies;
  const rustywind = 'rustywind' in devDependencies;

  return { rustywind, garou, stylelint, eslint, prettier };
}

export function lint({ shell }) {
  const { rustywind, garou, stylelint, eslint, prettier } = getDependencies();

  const useColor = process.stdin.isTTY ? ' --color' : '';

  const rustywindFunc = rustywind
    ? compareVersions('0.10.0', rustywind) === 1
      ? (files) => files.map((file) => `rustywind --write ${file}`)
      : 'rustywind --write'
    : undefined;

  const config = parse({
    '*.{vue,html,htm,md}': [
      rustywindFunc,
      garou && 'garou',
      prettier && `prettier --write${useColor}`,
      stylelint &&
        `stylelint --fix --custom-formatter=node_modules/stylelint-formatter-pretty${useColor}`,
      eslint && `eslint --fix --format=pretty${useColor}`,
    ],
    '*.{ts,tsx}': [prettier && `prettier --write${useColor}`],
    '*.{js,jsx,mjs,cjs,wxs,qs}': [
      rustywindFunc,
      garou && 'garou',
      prettier && `prettier --write${useColor}`,
      eslint && `eslint --fix --format=pretty${useColor}`,
    ],
    '*.{css,scss,less,wxss,qss,xml}': [
      garou && 'garou',
      prettier && `prettier --write${useColor}`,
      stylelint &&
        `stylelint --fix --custom-formatter=node_modules/stylelint-formatter-pretty${useColor}`,
    ],
    '{*.{json,svg},*.{to,y,ya}ml,.{babel,npm}rc,.editorconfig}': [
      prettier && `prettier --write${useColor}`,
    ],
    'yarn.lock': [
      'yarn-deduplicate',
      `replace-in-file --configFile="${yarnConfig}"`,
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
    shell: Boolean(shell),
    stash: true,
  })
    .then((passed) => {
      process.exitCode = passed ? 0 : 1;
    })
    .catch(() => {
      process.exitCode = 1;
    });
}
