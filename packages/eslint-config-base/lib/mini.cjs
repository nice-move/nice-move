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
  srcPluginRoot,
  cloudfunctionRoot,
}) {
  const paths = [miniprogramRoot, srcMiniprogramRoot, pluginRoot, srcPluginRoot]
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
        es2023: false,
        es2022: false,
        es2021: false,
        es2020: false,
        es2019: false,
        es2018: false,
        es2017: false,
        es2016: false,
        es6: false,
        node: false,
      },
      parserOptions: {
        ecmaVersion: 5,
        sourceType: 'script',
      },
      globals: {
        require: 'readonly',
        module: 'readonly',
        getRegExp: 'readonly',
        getDate: 'readonly',
      },
      rules: {
        'import/no-commonjs': 0,
        'no-var': 0,
        'object-shorthand': ['error', 'never'],
        'prefer-arrow-callback': 0,
        'prefer-rest-params': 0,
        'prefer-spread': 0,
        'prefer-template': 0,
        'vars-on-top': 0,
        'unicorn/prefer-export-from': 0,
        'unicorn/prefer-includes': 0,
        'unicorn/prefer-module': 0,
        'unicorn/prefer-string-replace-all': 0,
        'no-restricted-globals': [
          'error',
          'AggregateError',
          'Array',
          'ArrayBuffer',
          'Atomics',
          'BigInt',
          'BigInt64Array',
          'BigUint64Array',
          'Boolean',
          'DataView',
          'Date',
          'Error',
          'escape',
          'eval',
          'EvalError',
          'FinalizationRegistry',
          'Float32Array',
          'Float64Array',
          'Function',
          'globalThis',
          'Int16Array',
          'Int32Array',
          'Int8Array',
          'Map',
          'Object',
          'Promise',
          'Proxy',
          'RangeError',
          'ReferenceError',
          'Reflect',
          'RegExp',
          'Set',
          'SharedArrayBuffer',
          'String',
          'Symbol',
          'SyntaxError',
          'TypeError',
          'Uint16Array',
          'Uint32Array',
          'Uint8Array',
          'Uint8ClampedArray',
          'unescape',
          'URIError',
          'WeakMap',
          'WeakRef',
          'WeakSet',
        ],
      },
    },
  ].filter(Boolean);
}

module.exports = {
  overrides: config.appid ? generate(config) : [],
};
