import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import { create } from '@nice-move/eslint-config-base';
import hooks from 'eslint-config-airbnb/hooks';
import airbnb from 'eslint-config-airbnb/rules/react';
import airbnb2 from 'eslint-config-airbnb/rules/react-a11y';
import prettier from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';

import react from './lib/react.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

const files = ['**/*.{ts,js,tsx,jsx}'];

export default [
  ...create(
    ...compat.config(airbnb).map((config) => ({ ...config, files })),
    ...compat.config(airbnb2).map((config) => ({ ...config, files })),
  ),
  {
    files,
    ...react,
  },
  ...compat.config(hooks).map((config) => ({ ...config, files })),
  {
    files: ['**/*.md/*'],
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
  reactPlugin.configs.flat['jsx-runtime'],
  ...compat.config(prettier).map((rule) => ({
    ...rule,
    files,
  })),
];
