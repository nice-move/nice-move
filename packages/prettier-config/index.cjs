'use strict';

module.exports = {
  htmlWhitespaceSensitivity: 'ignore',
  iniSpaceAroundEquals: true,
  singleQuote: true,
  trailingComma: 'all',
  xmlWhitespaceSensitivity: 'ignore',
  ...(process.versions.pnp
    ? {
        plugins: [
          require.resolve('@nice-move/prettier-plugin-package-json'),
          require.resolve('@prettier/plugin-xml'),
          require.resolve('prettier-plugin-ini'),
          require.resolve('prettier-plugin-toml'),
        ],
      }
    : undefined),
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
      files: ['*.html', '*.htm'],
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
      files: ['*.ttss', '*jxss', '*.acss', '*.wxss', '*.qss'],
      options: {
        parser: 'css',
      },
    },
    {
      files: ['*.wxs', '*.qs'],
      options: {
        parser: 'babel',
      },
    },
  ],
};
