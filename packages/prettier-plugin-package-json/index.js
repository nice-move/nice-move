'use strict';

const { parsers } = require('prettier/parser-babylon');
const { format } = require('prettier-package-json');

const keyOrder = require('./key-order');

function mergeArray(bundledDependencies, bundleDependencies) {
  return bundledDependencies || bundleDependencies
    ? [
      ...new Set([
        ...(bundledDependencies || []),
        ...(bundleDependencies || [])
      ])
    ]
    : undefined;
}

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
      bundledDependencies: mergeArray(bundledDependencies, bundleDependencies)
    },
    {
      expandUsers: true,
      keyOrder
    }
  );
}

function mergeParser(parserName) {
  return {
    ...parsers[parserName],
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
