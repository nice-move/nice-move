'use strict';

const { relative } = require('node:path');
const { reaching } = require('settingz');

const cwd = process.cwd();

function relativeToCWD(path) {
  return relative(cwd, path);
}

function matcher(paths, globs) {
  return paths.length === 1
    ? `${paths[0]}/${globs}`
    : `{${paths.join(',')}}/${globs}`;
}

const config = reaching('./project.config.json');

function generate({
  miniprogramRoot,
  pluginRoot,
  srcMiniprogramRoot,
  cloudfunctionRoot,
}) {
  const paths = [miniprogramRoot, srcMiniprogramRoot, pluginRoot]
    .filter(Boolean)
    .map((item) => relativeToCWD(item));

  const excludedFiles = ['*.wxs', '*.qs'];

  const cloudMatcher = cloudfunctionRoot
    ? matcher([relativeToCWD(cloudfunctionRoot)], '**')
    : undefined;

  const globals = {
    clearInterval: 'readonly',
    clearTimeout: 'readonly',
    console: 'readonly',
    setInterval: 'readonly',
    setTimeout: 'readonly',
  };

  return [
    {
      files: matcher(paths, '**'),
      excludedFiles,
      env: {
        browser: false,
      },
      globals: {
        ...globals,
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
        Behavior: 'readonly',
        Component: 'readonly',
        Page: 'readonly',
      },
    },
    {
      files: matcher(paths, 'app.js'),
      globals: {
        App: 'readonly',
      },
    },
    cloudMatcher
      ? {
          files: [cloudMatcher],
          env: {
            browser: false,
          },
          globals: {
            ...globals,
            require: 'readonly',
            exports: 'readonly',
          },
          rules: {
            'import/no-commonjs': 'off',
            'unicorn/prefer-module': 'off',
          },
        }
      : undefined,
    {
      files: excludedFiles,
      env: {
        browser: false,
        es2022: false,
        es2021: false,
        es2020: false,
        es2019: false,
        es2018: false,
        es2017: false,
        es2016: false,
        es6: false,
      },
      parserOptions: {
        ecmaVersion: 5,
        sourceType: 'script',
      },
      globals: {
        require: 'readonly',
        module: 'readonly',
      },
      rules: {
        'import/no-commonjs': 0,
        'no-var': 0,
        'object-shorthand': ['error', 'never'],
        'prefer-spread': 0,
        'prefer-template': 0,
        'unicorn/prefer-includes': 0,
        'unicorn/prefer-export-from': 0,
        'unicorn/prefer-module': 0,
      },
    },
    {
      files: '*.js',
      rules: {
        'n/file-extension-in-import': [
          'error',
          'always',
          {
            '.ts': 'never',
          },
        ],
        'import/extensions': [
          'error',
          'always',
          {
            ignorePackages: true,
            pattern: {
              ts: 'never',
            },
          },
        ],
      },
      settings: {
        'import/resolver': {
          node: {
            extensions: ['.ts'],
          },
        },
      },
    },
  ].filter(Boolean);
}

module.exports = {
  overrides: config.appid ? generate(config) : [],
};
