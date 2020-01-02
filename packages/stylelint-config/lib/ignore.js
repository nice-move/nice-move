const { join } = require('path');

module.exports = {
  ignoreFiles: [
    'node_modules/*',
    '**/*.min.{css,less,scss,js}',
    '.best-shot/{build,inspect,stats}/*'
  ].map(item => join(process.cwd(), item))
};
