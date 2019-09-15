'use strict';

const loose = {
  severity: 'warning'
};

module.exports = {
  plugins: [
    'stylelint-high-performance-animation',
    'stylelint-no-unsupported-browser-features'
  ],
  rules: {
    'plugin/no-low-performance-animation-properties': [true, loose],
    'plugin/no-unsupported-browser-features': [
      true,
      {
        ignore: ['css-resize'],
        ...loose
      }
    ]
  }
};
