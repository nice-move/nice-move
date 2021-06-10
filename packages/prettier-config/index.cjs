module.exports = {
  htmlWhitespaceSensitivity: 'ignore',
  iniSpaceAroundEquals: true,
  singleQuote: true,
  trailingComma: 'all',
  xmlSelfClosingSpace: true,
  xmlWhitespaceSensitivity: 'ignore',
  plugins: [
    require.resolve('@nice-move/prettier-plugin-package-json'),
    require.resolve('prettier-plugin-toml'),
    require.resolve('prettier-plugin-ini'),
    require.resolve('@prettier/plugin-xml'),
  ],
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
      files: ['*.wxss'],
      options: {
        parser: 'css',
      },
    },
    {
      files: ['*.wxs'],
      options: {
        parser: 'babel',
      },
    },
  ],
};
