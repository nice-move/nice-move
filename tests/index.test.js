'use strict';

// eslint-disable-next-line import/no-extraneous-dependencies
const prettier = require('prettier');
// eslint-disable-next-line import/no-extraneous-dependencies
const test = require('ava');

const original = `{
  "name": "prettier-plugin-package-json",
  "private": true,
  "version": "0.0.0"
}
`;

const expected = `{
  "name": "prettier-plugin-package-json",
  "version": "0.0.0",
  "private": true
}
`;

test('Usage', t => {
  const actual = prettier.format(original, {
    parser: 'json-stringify',
    filepath: 'package.json'
  });
  t.is(actual, expected);
});

test('Skip', t => {
  const actual = prettier.format(original, {
    parser: 'json-stringify'
  });
  t.is(actual, original);
});
