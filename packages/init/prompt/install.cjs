const install = require('yarn-install');
const { cyan } = require('chalk');

const message = `Run ${cyan('npm')} / ${cyan('yarn')} install command`;

exports.prompt = () => ({
  active: 'yes',
  inactive: 'no',
  message,
  name: 'Install',
  type: (first) => (first === false ? null : 'toggle'),
  // eslint-disable-next-line consistent-return
  format(value) {
    if (value === true) {
      return () => {
        console.log('-'.repeat(32));
        install();
      };
    }
  },
});
