const defaultConfig = {
  htmlWhitespaceSensitivity: 'ignore',
  iniSpaceAroundEquals: true,
  singleQuote: true,
  trailingComma: 'all',
  xmlSelfClosingSpace: true,
  xmlWhitespaceSensitivity: 'ignore',
};

module.exports = {
  ...defaultConfig,
  overrides: [
    {
      files: ['.babelrc', '*.json'],
      options: {
        parser: 'json-stringify',
      },
    },
    {
      files: 'package.json',
      options: {
        parser: 'package-json',
      },
    },
    {
      files: '*.md',
      options: {
        trailingComma: 'none',
      },
    },
    {
      files: '*.html',
      options: {
        trailingComma: 'es5',
      },
    },
    {
      files: ['.npmrc', '.editorconfig'],
      options: {
        parser: 'ini',
      },
    },
    {
      files: '.yarnrc',
      options: {
        parser: 'dot-properties',
        keySeparator: ' ',
      },
    },
  ],
};
