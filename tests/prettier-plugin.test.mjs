import test from 'ava';
import prettier from 'prettier';

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
}`;

test('Usage', (t) => {
  const actual = prettier.format(original, {
    parser: 'package-json',
  });

  t.is(actual, expected);
});
