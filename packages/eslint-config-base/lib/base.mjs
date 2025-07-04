import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import * as regexpPlugin from 'eslint-plugin-regexp';

import { getGlobals } from './utils.mjs';

const all = ['**/*.{js,jsx,ts,tsx,mjs,mts,cjs,cts,qs,wxs,vue}'];

export default [
  {
    files: all,
    ...comments.recommended,
  },
  {
    files: all,
    ...regexpPlugin.configs['flat/recommended'],
  },
  {
    files: all,
    rules: {
      'lines-around-directive': 0,
      'array-callback-return': [
        'error',
        {
          allowImplicit: true,
          checkForEach: true,
        },
      ],
      'arrow-body-style': 0,
      camelcase: 0,
      'global-require': 0,
      'class-methods-use-this': 0,
      'consistent-return': 'warn',
      'grouped-accessor-pairs': 0,
      'lines-between-class-members': 0,
      'max-classes-per-file': 0,
      'no-await-in-loop': 0,
      'no-console': 0,
      'no-constant-binary-expression': 'error',
      'no-constructor-return': 0,
      'no-empty': [
        'error',
        {
          allowEmptyCatch: true,
        },
      ],
      'no-implicit-coercion': [
        'warn',
        {
          disallowTemplateShorthand: true,
        },
      ],
      'no-nested-ternary': 0,
      'no-restricted-exports': [
        'error',
        {
          restrictedNamedExports: ['then', 'await'],
        },
      ],
      'no-param-reassign': [
        'warn',
        {
          ignorePropertyModificationsFor: [],
          props: true,
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          message:
            'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
          selector: 'ForInStatement',
        },
        {
          message:
            'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
          selector: 'LabeledStatement',
        },
      ],
      'no-plusplus': 0,
      'no-template-curly-in-string': 0,
      'no-undef-init': 0,
      'no-underscore-dangle': 0,
      'no-unreachable-loop': 0,
      'no-unused-expressions': [
        'error',
        {
          allowTaggedTemplates: true,
        },
      ],
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_+$',
          varsIgnorePattern: '^_+$',
          ignoreRestSiblings: true,
          reportUsedIgnorePattern: true,
        },
      ],
      'no-useless-rename': 0,
      'object-shorthand': 0,
      'prefer-arrow-callback': 'warn',
      'prefer-exponentiation-operator': 0,
      'prefer-template': 'warn',
      'spaced-comment': 0,
      'default-param-last': 0,
      '@eslint-community/eslint-comments/no-unused-enable': 'warn',
      '@eslint-community/eslint-comments/disable-enable-pair': 0,
    },
    settings: {
      tryExtensions: [
        '.js',
        '.ts',
        '.jsx',
        '.tsx',
        '.mjs',
        '.cjs',
        '.mts',
        '.cts',
        '.vue',
      ],
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,mts,cjs,cts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...getGlobals({ es2025: true }),
      },
    },
  },
  {
    files: ['**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...getGlobals({ es2025: true, browser: true }),
      },
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true,
          globalReturn: false,
        },
      },
    },
  },
  {
    files: ['**/*.js', '**/*.ts'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: false,
        },
      },
    },
  },
  {
    files: ['**/*.jsx', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    files: ['**/*.mjs', '**/*.mts', '**/*.cts'],
    languageOptions: {
      globals: {
        ...getGlobals({ es2025: true, node: true }),
      },
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true,
          jsx: false,
        },
      },
    },
  },
  {
    files: ['**/*.{cjs,cts}'],
    languageOptions: {
      globals: {
        ...getGlobals({ es2025: true, commonjs: true, node: true }),
      },
    },
    rules: {
      strict: ['error', 'global'],
    },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      parserOptions: {
        ecmaFeatures: {
          jsx: false,
          impliedStrict: false,
        },
      },
    },
  },
];
