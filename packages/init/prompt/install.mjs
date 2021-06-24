import { cyan } from 'chalk';
import install from 'yarn-install';

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
