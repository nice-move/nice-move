import install from 'yarn-install';

import { cyan } from '../lib/color.mjs';

const message = `Run ${cyan('npm')} / ${cyan('yarn')} install command`;

export function Install() {
  return {
    message,
    name: 'Install',
    type: (first) => (first === false ? null : 'confirm'),
    // eslint-disable-next-line consistent-return
    format(value) {
      if (value === true) {
        return () => {
          console.log('-'.repeat(32));
          install();
        };
      }
    },
  };
}
