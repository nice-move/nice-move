const handler = require('@nice-move/lint');
const { description } = require('@nice-move/lint/package.json');

exports.command = 'lint';

exports.describe = description;

exports.builder = (cli) => {
  cli.options({
    shell: {
      alias: 'x',
      default: false,
      describe: 'skip parsing of tasks for better shell support',
      type: 'boolean',
    },
  });
};

exports.handler = handler;
