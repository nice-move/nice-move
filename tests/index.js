/* eslint-disable import/no-extraneous-dependencies */
const test = require('ava');
const { lint: stylelint } = require('stylelint');
const { lint: eslint } = require('eslint');

async function check(t, linter, config) {
  try {
    const result = await linter(config);
    console.log(result);
    t.pass('Pass.');
  } catch (error) {
    console.error(error);
    t.fail('Fail.');
  }
}

test('Check stylelint config', t => {
  check(t, stylelint, {
    config: { extends: 'stylelint-config-airkro' },
    code: `body {
  width: 80px;
}`
  });

  check(t, stylelint, {
    config: { extends: 'stylelint-config-airkro' },
    code: `
body{with:80p
}`
  });
});

test('Check eslint config', t => {
  check(t, eslint, {
    config: {},
    code: `const a = () => 4;
a();`
  });

  check(t, eslint, {
    config: {},
    code: `alert(
4564)`
  });
});
