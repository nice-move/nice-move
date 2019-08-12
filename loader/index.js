'use strict';

const sortKeys = require('sort-keys');
const { format } = require('prettier');
const getRuleFinder = require('eslint-find-rules');

function sort(data) {
  return sortKeys(data, { deep: true });
}

function formatJSON(data) {
  return format(JSON.stringify(sort(data)), {
    parser: 'json'
  });
}

module.exports = function loader() {
  if (this.cacheable) {
    this.cacheable();
  }

  const { resourcePath } = this;

  const ruleFinder = getRuleFinder(resourcePath);

  const data = ruleFinder.getCurrentRulesDetailed();

  const result = JSON.stringify(formatJSON(data))
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

  return `export default ${result}`;
};
