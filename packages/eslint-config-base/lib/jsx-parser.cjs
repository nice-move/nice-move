'use strict';

// eslint-disable-next-line import/no-extraneous-dependencies
const espree = require('espree');

module.exports = {
  ...espree,
  parse(code, options) {
    // eslint-disable-next-line no-param-reassign
    options.ecmaFeatures.jsx = true;
    return espree.parse(code, options);
  },
};
