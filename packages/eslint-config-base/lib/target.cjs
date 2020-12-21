const { resolve } = require('path');

function getTarget() {
  try {
    const { compilerOptions: { target = 'es2020' } = {} } = require(resolve(
      process.cwd(),
      'jsconfig.json',
    ));
    return /es20(1{5,9}|2{0,1})/.test(target) ? target : 'es2020';
  } catch {
    return 'es2020';
  }
}

const target = Number.parseInt(getTarget().replace(/^es/, ''), 10);

module.exports = {
  target,
  env:
    {
      2020: 'es2020',
      2019: 'es2017',
      2018: 'es2017',
      2017: 'es2017',
      2016: 'es2015',
      2015: 'es2015',
    }[target] || 'es2015',
};
