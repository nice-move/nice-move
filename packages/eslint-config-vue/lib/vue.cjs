const { parserOptions } = require('@nice-move/eslint-config-base/lib/base.cjs');

const { env, parser } = require('./babel.cjs');

module.exports = {
  env,
  parserOptions: {
    ...parserOptions,
    parser,
  },
};
