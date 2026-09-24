import { fileURLToPath } from 'node:url';

import { execa } from 'execa';
import { isReachable } from 'settingz';

export function svgoCaller() {
  if (
    isReachable('svgo/package.json') &&
    isReachable('svgo-config/package.json')
  ) {
    return {
      command: 'svgo',
      describe: 'Run `svgo` to optimize `*.svg`',
      async handler(options) {
        const [path = './'] = options._;

        try {
          await execa('svgo', [
            '-r',
            '-q',
            '--pretty',
            '--indent',
            '2',
            '--config',
            fileURLToPath(import.meta.resolve('svgo-config')),
            '-f',
            path,
          ]);

          console.log('Done: calling svgo');
        } catch (error) {
          process.exitCode = 1;
          console.error('Error:', error.message);
        }
      },
    };
  }
}
