import { relative } from 'node:path';
import { reaching } from 'settingz';
import { getGlobals } from './utils.mjs';

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

  const ignores = ['**/*.wxs', '**/*.qs'];

  const cloudMatcher = cloudfunctionRoot
    ? matcher([relativeToCWD(cloudfunctionRoot)], '**')
    : undefined;

  // const globals = {
  //   clearInterval: 'readonly',
  //   clearTimeout: 'readonly',
  //   console: 'readonly',
  //   setInterval: 'readonly',
  //   setTimeout: 'readonly',
  // };

  return [
    {
      files: [matcher(paths, '**')],
      ignores,
      languageOptions: {
        globals: {
          wx: 'readonly',
          getApp: 'readonly',
          getCurrentPages: 'readonly',
          requirePlugin: 'readonly',
          requireMiniProgram: 'readonly',
        },
      },
    },
    {
      files: [matcher(paths, 'component{,s}/**')],
      ignores,
      languageOptions: {
        globals: {
          Component: 'readonly',
          Behavior: 'readonly',
        },
      },
    },
    {
      files: [matcher(paths, 'page{,s}/**')],
      ignores,
      languageOptions: {
        globals: {
          Behavior: 'readonly',
          Component: 'readonly',
          Page: 'readonly',
        },
      },
    },
    {
      files: [matcher(paths, 'app.js')],
      languageOptions: {
        globals: {
          App: 'readonly',
        },
      },
    },
    cloudMatcher
      ? {
          files: [cloudMatcher],
          languageOptions: {
            globals: {
              require: 'readonly',
              exports: 'readonly',
            },
          },
          rules: {
            'import/no-commonjs': 'off',
            'unicorn/prefer-module': 'off',
          },
        }
      : undefined,
    {
      files: ignores,
      languageOptions: {
        ecmaVersion: 5,
        sourceType: 'commonjs',
        globals: {
          ...getGlobals(),
          Date: false,
          decodeURI: false,
          decodeURIComponent: false,
          encodeURI: false,
          encodeURIComponent: false,
          getDate: false,
          getRegExp: false,
          Infinity: false,
          isFinite: false,
          isNaN: false,
          JSON: false,
          Math: false,
          module: false,
          NaN: false,
          Number: false,
          parseFloat: false,
          parseInt: false,
          require: false,
          undefined: false,
        },
        parserOptions: {
          ecmaFeatures: {
            globalReturn: false,
            impliedStrict: false,
            jsx: false,
            objectLiteralDuplicateProperties: false,
          },
        },
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

export default config.appid ? generate(config) : [];
