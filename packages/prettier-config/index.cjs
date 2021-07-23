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
          require.resolve('prettier-plugin-ssh-config'),
        ],
      }
    : undefined),
  overrides: [
    {
      files: ['*.json'],
      options: {
        parser: 'json-stringify',
      },
    },
    {
      files: ['.*rc', '.*rc.json', '{t,j}sconfig.json', '.vscode/*.json'],
      options: {
        parser: 'json',
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
      files: ['.npmrc', '*.editorconfig'],
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
    {
      files: '.ssh/config',
      options: {
        parser: 'ssh-config',
      },
    },
  ],
};
