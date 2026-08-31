import { createRequire } from 'node:module';

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
        const require = createRequire(import.meta.url);

        try {
          await execa('svgo', [
            '-r',
            '-q',
            '--pretty',
            '--indent',
            '2',
            '--config',
            require.resolve('svgo-config'),
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
