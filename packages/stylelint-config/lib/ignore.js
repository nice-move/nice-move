const { join } = require('path');

module.exports = {
  ignoreFiles: [
    '**/node_modules/**',
    '**/*.min.*',
    '.best-shot/(build|inspect|stats)/**'
  ].map(item => join(process.cwd(), item))
};
