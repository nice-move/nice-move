import nodePlugin from 'eslint-plugin-n';

function pick({ rules, plugins }) {
  return { rules, plugins };
}

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,mts,cts,vue}'],
    ...pick(nodePlugin.configs['flat/recommended-module']),
  },
  {
    files: ['**/*.{cjs,qs,wxs}'],
    ...pick(nodePlugin.configs['flat/recommended-script']),
  },
  {
    files: ['**/*.{js,jsx,ts,tsx,vue,qs,wxs}'],
    rules: {
      'n/hashbang': 'error',
      'n/no-process-env': 'error',
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,mts,cjs,cts,vue,qs,wxs}'],
    rules: {
      'n/no-path-concat': 'error',
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
