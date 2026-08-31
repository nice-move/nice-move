import { fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import { create } from '@nice-move/eslint-config-base';
import hooks from 'eslint-config-airbnb/hooks';
import airbnb from 'eslint-config-airbnb/rules/react';
import airbnb2 from 'eslint-config-airbnb/rules/react-a11y';
import prettier from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

import react from './lib/react.mjs';

const compat = new FlatCompat({
  baseDirectory: import.meta.__dirname,
  resolvePluginsRelativeTo: import.meta.__dirname,
});

// `eslint-plugin-react` still relies on `context` members removed in eslint 10
function fixup(config) {
  if (!config.plugins?.react) {
    return config;
  }

  return {
    ...config,
    plugins: {
      ...config.plugins,
      react: fixupPluginRules(config.plugins.react),
    },
  };
}

const files = ['**/*.{ts,js,tsx,jsx}'];

export default [
  ...create(
    ...compat.config(airbnb).map((config) => fixup({ ...config, files })),
    ...compat.config(airbnb2).map((config) => fixup({ ...config, files })),
  ),
  {
    files,
    ignores: ['**/*.md/*'],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    files,
    ...react,
  },
  ...compat.config(hooks).map((config) => ({ ...config, files })),
  {
    files,
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: reactHooks.configs.recommended.rules,
  },
  {
    files: ['**/*.md/*'],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-undef': 'warn',
    },
  },
  fixup(reactPlugin.configs.flat['jsx-runtime']),
  ...compat.config(prettier).map((rule) => ({
    ...rule,
    files,
  })),
];
