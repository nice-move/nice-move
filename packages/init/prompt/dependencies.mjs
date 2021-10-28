import deepmerge from 'deepmerge';
import { Json, Text } from 'fs-chain';

import latest from '../lib/latest.mjs';
import { pkgCwd } from '../lib/utils.mjs';

function checkEslint({ vue, react }) {
  const type =
    (react && vue) || (!react && !vue) ? 'base' : react ? 'react' : 'vue';

  return {
    eslintConfig: {
      extends: `@nice-move/eslint-config-${type}`,
    },
    devDependencies: {
      [`@nice-move/eslint-config-${type}`]: latest['eslint-config-base'],
      eslint: latest.eslint,
    },
  };
}

const message = 'Add/Reset project dependencies';

function action(isGit, wanted = {}) {
  return new Json()
    .config({ pretty: true })
    .source('package.json')
    .onFail()
    .onDone(async (old = {}) => {
      const { devDependencies = {}, dependencies = {} } = old;
      const {
        ava = 'ava' in devDependencies,
        commitlint = 'commitlint' in devDependencies,
        eslint = 'eslint' in devDependencies,
        garou = 'garou' in devDependencies,
        prettier = 'prettier' in devDependencies,
        react = 'react' in dependencies,
        stylelint = 'stylelint' in devDependencies,
        typescript = 'typescript' in devDependencies,
        vue = 'vue' in dependencies,
        tailwindcss = 'tailwindcss' in dependencies ||
          'tailwindcss' in devDependencies,
        rustywind = 'rustywind' in devDependencies,
        postcss = 'postcss' in devDependencies,
        playwright = '@playwright/test' in devDependencies,
        'bring-it': bringIt = '@bring-it/cli' in devDependencies,
      } = wanted;

      const useLint = eslint || stylelint || prettier || garou;

      const prepublishOnly = [
        useLint ? 'npm run lint' : undefined,
        ava ? 'npm test' : undefined,
      ].filter(Boolean);

      if (prepublishOnly.length > 0) {
        await new Text()
          .onDone(() => ['#!/bin/sh', '', ...prepublishOnly, ''].join('\n'))
          .output('.githooks/pre-commit');
      }

      if (commitlint) {
        await new Text()
          .onDone(() =>
            ['#!/bin/sh', '', 'npx --no-install commitlint -e', ''].join('\n'),
          )
          .output('.githooks/commit-msg');
      }

      return deepmerge.all(
        [
          old,
          isGit && (useLint || ava || commitlint)
            ? {
                scripts: {
                  prepare: 'git config core.hooksPath .githooks',
                },
              }
            : undefined,
          garou
            ? {
                devDependencies: {
                  garou: latest.garou,
                },
              }
            : undefined,
          typescript
            ? {
                devDependencies: {
                  typescript: latest.typescript,
                },
              }
            : undefined,
          commitlint
            ? {
                commitlint: {
                  extends: '@nice-move/commitlint-config',
                },
                devDependencies: {
                  commitlint: latest.commitlint,
                  '@nice-move/commitlint-config': latest['commitlint-config'],
                },
              }
            : undefined,
          useLint
            ? {
                devDependencies: {
                  '@nice-move/cli': latest.cli,
                },
                scripts: {
                  lint: 'nice-move lint',
                },
              }
            : undefined,
          ava
            ? {
                devDependencies: {
                  ava: latest.ava,
                  ...(eslint
                    ? {
                        'eslint-plugin-ava': latest['eslint-plugin-ava'],
                      }
                    : undefined),
                },
                scripts: {
                  prepublishOnly: old.private
                    ? undefined
                    : prepublishOnly.join(' && ') || undefined,
                  test: 'ava --fail-fast',
                },
              }
            : undefined,
          eslint ? checkEslint({ react, vue }) : undefined,
          stylelint
            ? {
                devDependencies: {
                  '@nice-move/stylelint-config': latest['stylelint-config'],
                  stylelint: latest.stylelint,
                },
                stylelint: {
                  extends: '@nice-move/stylelint-config',
                },
              }
            : undefined,
          prettier
            ? {
                devDependencies: {
                  '@nice-move/prettier-config': latest['prettier-config'],
                  prettier: latest.prettier,
                },
                prettier: '@nice-move/prettier-config',
              }
            : undefined,
          react
            ? {
                dependencies: {
                  react: latest.react,
                  'react-dom': latest['react-dom'],
                },
                devDependencies: { '@types/react': latest['@types/react'] },
              }
            : undefined,
          vue ? { dependencies: { vue: latest.vue } } : undefined,
          tailwindcss
            ? { dependencies: { tailwindcss: latest.tailwindcss } }
            : undefined,
          rustywind
            ? { devDependencies: { tailwindcss: latest.rustywind } }
            : undefined,
          postcss
            ? { devDependencies: { tailwindcss: latest.postcss } }
            : undefined,
          playwright
            ? {
                devDependencies: {
                  '@playwright/test': latest['@playwright/test'],
                },
              }
            : undefined,
          bringIt
            ? {
                devDependencies: {
                  '@bring-it/cli': latest['@bring-it/cli'],
                },
              }
            : undefined,
        ].filter(Boolean),
      );
    })
    .output()
    .logger(message)
    .catch(console.warn);
}

export function Dependencies() {
  const list = [
    'react',
    'vue',
    'typescript',
    'commitlint',
    'eslint',
    'stylelint',
    'prettier',
    'garou',
    'rustywind',
    'ava',
    'playwright',
    'bring-it',
    'postcss',
    'tailwindcss',
  ];

  const { dependencies = {}, devDependencies = {} } = pkgCwd();

  return {
    instructions: false,
    optionsPerPage: 20,
    message,
    name: 'Dependencies',
    type: (first) => (first === false ? null : 'multiselect'),
    choices: list.map((item) => ({
      title: item,
      value: item,
      selected: item in dependencies || item in devDependencies,
    })),
    // eslint-disable-next-line consistent-return
    format: (keywords) => {
      if (keywords.length > 0) {
        return (isGit) =>
          action(
            isGit,
            Object.fromEntries(keywords.map((item) => [item, true])),
          );
      }
    },
  };
}
