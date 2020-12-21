const handler = require('@nice-move/init');

const { description } = require('@nice-move/init/package.json');

exports.command = 'init';

exports.describe = description;

exports.handler = handler;
