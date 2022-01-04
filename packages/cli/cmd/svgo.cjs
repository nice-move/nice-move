'use strict';

const { isReachable } = require('settingz');

// eslint-disable-next-line consistent-return
module.exports = function svgoCaller() {
  if (
    isReachable('svgo/package.json') &&
    isReachable('svgo-config/package.json')
  ) {
    return {
      command: 'svgo',
      describe: 'Run `svgo` to optimize `*.svg`',
      handler({ _: [_, path = './'] }) {
        const execa = require('execa');

        execa('svgo', [
          '-r',
          '-q',
          '--pretty',
          '--indent',
          '2',
          '--config',
          'node_modules/svgo-config/config.json',
          '-f',
          path,
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
