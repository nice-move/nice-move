'use strict';

// eslint-disable-next-line import/no-extraneous-dependencies
const { format } = require('prettier');
// eslint-disable-next-line import/no-extraneous-dependencies
const test = require('ava');

const original = `{
  "name": "prettier-plugin-package-json",
  "private": true,
  "version": "0.0.0"
}
`;

const expected = `{
  "private": true,
  "name": "prettier-plugin-package-json",
  "version": "0.0.0"
}
`;

test('Usage', t => {
  const actual = format(original, { filepath: 'package.json' });
  t.is(actual, expected);
});

test('Skip', t => {
  const actual = format(original, { filepath: 'test.json' });
  t.is(actual, original);
});
