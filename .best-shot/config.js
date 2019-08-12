const { resolve } = require('path');

module.exports = {
  presets: ['babel', 'style', 'react', 'web'],
  staticPath: false,
  entry: './viewer/index.js',
  html: {
    template: './viewer/index.tpl',
    title: 'Rule Viewer'
  },
  webpackChain: config => {
    config.module
      .rule('print')
      .test(/\.json$/)
      .type('javascript/esm')
      .include.add(resolve(__dirname, '../rules'))
      .end()
      .use('rule-loader')
      .loader('rule-loader');
  }
};
