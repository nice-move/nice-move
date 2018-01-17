const { parserOptions } = require('@nice-move/eslint-config-base/lib/base');

const { env, parser } = require('./babel');

module.exports = {
  env,
  parserOptions: {
    ...parserOptions,
    parser,
  },
};
