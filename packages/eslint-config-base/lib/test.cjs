'use strict';

const { reaching } = require('settingz');

const { configs: { recommended: { rules } = {} } = {} } = reaching(
  'eslint-plugin-ava/index.js',
);

module.exports = {
  overrides: [
    {
      files: [
        '**/{test,tests,spec,specs}/**/*.{m,c,}{j,t}s',
        '*.{test,spec}.{m,c,}{j,t}s}',
      ],
      plugins: rules ? ['ava'] : undefined,
      rules: {
        ...rules,
        'ava/no-ignored-test-files': 0,
      },
    },
  ],
};
