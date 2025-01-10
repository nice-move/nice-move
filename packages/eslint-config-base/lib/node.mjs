import nodePlugin from 'eslint-plugin-n';

function pick({ rules, plugins }) {
  return { rules, plugins };
}

export default [
  {
    files: ['**/*.{mjs,mts,cts}'],
    ...pick(nodePlugin.configs['flat/recommended-module']),
  },
  {
    files: ['**/*.{mjs,mts,cts}'],
    rules: {
      'n/no-missing-import': 0,
      'n/no-extraneous-import': 0,
      'n/no-missing-require': 0,
      'n/no-extraneous-require': 0,
    },
  },
  {
    files: ['**/*.cjs'],
    ...pick(nodePlugin.configs['flat/recommended-script']),
  },
  {
    files: ['**/*.cjs'],
    rules: {
      'n/no-missing-import': 0,
      'n/no-extraneous-import': 0,
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,mts,vue}'],
    rules: {
      'import/no-commonjs': 'error',
    },
  },
  {
    files: ['**/*.{m,c}{t,j}s'],
    rules: {
      'n/no-path-concat': 'error',
      'n/no-deprecated-api': 'error',
      'n/no-process-env': 'off',
      'n/no-process-exit': 'warn',
      'n/no-unsupported-features/es-builtins': 'error',
      'n/no-unsupported-features/es-syntax': 'error',
      'n/no-unsupported-features/node-builtins': 'error',
      'n/prefer-global/buffer': 'warn',
      'n/prefer-global/console': 'warn',
      'n/prefer-global/process': 'warn',
      'n/prefer-global/url-search-params': 'warn',
      'n/prefer-global/url': 'warn',
      'n/process-exit-as-throw': 'error',
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx,cts,mjs,mts,vue}'],
    ignores: ['**/*.md/*'],
    rules: {
      'n/file-extension-in-import': 'error',
    },
    plugins: {
      n: nodePlugin,
    },
    settings: {
      n: {
        tryExtensions: [
          '.js',
          '.ts',
          '.jsx',
          '.tsx',
          '.mjs',
          '.mts',
          '.cjs',
          '.cts',
          '.vue',
        ],
        typescriptExtensionMap: [],
      },
    },
  },
  {
    files: ['**/*.{cjs,cts}'],
    rules: {
      'n/no-exports-assign': 'error',
      'n/no-new-require': 'error',
      'unicorn/prefer-module': 'off',
    },
  },
];
