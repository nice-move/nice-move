'use strict';

const { parsers: Parsers } = require('prettier/parser-babylon');
const { format } = require('prettier-package-json');

const keyOrder = [
  'name',
  'version',
  'license',
  'private',

  'author',
  'maintainers',
  'contributors',

  'description',
  'keywords',
  'homepage',

  'bugs',
  'repository',

  'man',
  'bin',
  'browser',
  'module',
  'main',
  'files',
  'directories',

  'scripts',
  'config',

  'workspaces',
  'flat',

  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies',
  'bundleDependencies',
  'bundledDependencies',
  'resolutions',

  'engines',
  'os',
  'cpu',

  'publishConfig'
];

function formatter(text) {
  const {
    'engine-strict': x,
    preferGlobal,
    engineStrict,
    bundledDependencies,
    bundleDependencies,
    ...data
  } = JSON.parse(text);
  return format(
    {
      ...data,
      bundledDependencies:
        bundledDependencies || bundleDependencies
          ? { ...bundledDependencies, ...bundleDependencies }
          : undefined
    },
    {
      expandUsers: true,
      keyOrder
    }
  );
}

function mergeParser(parserName) {
  return {
    ...Parsers[parserName],
    preprocess(text, { filepath }) {
      return filepath && /(^|\\|\/)package\.json$/.test(filepath)
        ? formatter(text)
        : text;
    }
  };
}

exports.parsers = {
  json: mergeParser('json'),
  'json-stringify': mergeParser('json-stringify')
};
