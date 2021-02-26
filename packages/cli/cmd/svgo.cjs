function isModuleInstall(moduleId) {
  try {
    require.resolve(moduleId);
    return true;
  } catch (error) {
    if (
      error.code === 'MODULE_NOT_FOUND' &&
      error.requireStack &&
      error.requireStack[0] === __filename
    ) {
      return false;
    }
    throw error;
  }
}

module.exports = function svgoCaller() {
  if (
    isModuleInstall('svgo/package.json') &&
    isModuleInstall('svgo-config/package.json')
  ) {
    return {
      command: 'svgo',
      describe: 'Run `svgo`',
      handler() {
        const execa = require('execa');
        execa('svgo', [
          '-r',
          '-q',
          '--pretty',
          '-f',
          './',
          '--indent',
          '2',
          '--config',
          'node_modules/svgo-config/config.json',
        ])
          .then(() => {
            console.log('Done: calling svgo');
          })
          .catch((error) => {
            process.exitCode = 1;
            console.error('Error:', error.message);
          });
      },
    };
  }
};
