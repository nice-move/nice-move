'use strict';

const { relative } = require('path');

const { projectHasConfig } = require('./utils.cjs');

const cwd = process.cwd();

function relativeToCWD(path) {
  return relative(cwd, path);
}

function matcher(paths, globs) {
  return paths.length === 1
    ? `${paths[0]}/${globs}`
    : `{${paths.join(',')}}/${globs}`;
}

module.exports = {
  ...projectHasConfig(({ miniprogramRoot, pluginRoot, cloudfunctionRoot }) => {
    const paths = [miniprogramRoot, pluginRoot]
      .filter(Boolean)
      .map((item) => relativeToCWD(item));
    const excludedFiles = ['*.wxs', '*.qs'];

    return {
      overrides: [
        {
          files: matcher(paths, '**'),
          excludedFiles,
          globals: {
            wx: 'readonly',
            getApp: 'readonly',
            getCurrentPages: 'readonly',
            requirePlugin: 'readonly',
            requireMiniProgram: 'readonly',
          },
        },
        {
          files: matcher(paths, 'component{,s}/**'),
          excludedFiles,
          globals: {
            Component: 'readonly',
            Behavior: 'readonly',
          },
        },
        {
          files: matcher(paths, 'page{,s}/**'),
          excludedFiles,
          globals: {
            Page: 'readonly',
          },
        },
        {
          files: matcher(paths, 'app.js'),
          globals: {
            App: 'readonly',
          },
        },
        cloudfunctionRoot
          ? {
              files: matcher([relativeToCWD(cloudfunctionRoot)], '**'),
              globals: {
                require: 'readonly',
                exports: 'readonly',
              },
              rules: {
                'import/no-commonjs': 'off',
                'unicorn/prefer-module': 'off',
              },
            }
          : undefined,
      ].filter(Boolean),
    };
  }),
};
