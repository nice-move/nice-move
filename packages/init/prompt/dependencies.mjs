import deepmerge from 'deepmerge';
import { Json, Text } from 'fs-chain';

import latest from '../lib/latest.mjs';
import { getPkg } from '../lib/utils.mjs';

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

function action(isRoot, wanted = {}) {
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
        syncpack = 'syncpack' in devDependencies,
        typescript = 'typescript' in devDependencies,
        vue = 'vue' in dependencies,
        tailwindcss = 'tailwindcss' in dependencies ||
          'tailwindcss' in devDependencies,
        playwright,
        '@bring-it/sftp': bringItSFTP = '@bring-it/sftp' in devDependencies,
        '@bring-it/npm': bringItNPM = '@bring-it/npm' in devDependencies,
        'best-shot': bestShot = 'best-shot' in devDependencies,
      } = wanted;

      const useLint = eslint || stylelint || prettier || garou;

      const prepublishOnly = [
        useLint ? 'npm run lint:staged' : undefined,
        typescript ? 'npm run lint:type' : undefined,
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
            [
              '#!/bin/sh',
              '',
              'npx --no-install nice-move lint commit',
              '',
            ].join('\n'),
          )
          .output('.githooks/commit-msg');
      }

      if (syncpack) {
        await new Text()
          .onDone(() =>
            [
              '// @ts-check',
              '',
              "import defineConfig from '@nice-move/syncpack-config';",
              '',
              'export default defineConfig(import.meta.url, {});',
            ].join('\n'),
          )
          .output('syncpack.config.js');
      }

      if (typescript) {
        await new Json()
          .config({ pretty: true })
          .onDone(() => ({
            extends: '@nice-move/tsconfig/base.json',
            include: ['./'],
          }))
          .output('tsconfig.json');
      }

      return deepmerge.all(
        [
          old,
          isRoot && (useLint || ava || commitlint || playwright || typescript)
            ? {
                scripts: {
                  prepare: 'nice-move git hooks',
                },
              }
            : undefined,
          garou
            ? {
                devDependencies: {
                  garou: latest.garou,
                },
                'nice-move': {
                  'import-groups': ['nice-move-preset'],
                },
              }
            : undefined,
          typescript
            ? {
                devDependencies: {
                  typescript: latest.typescript,
                  '@nice-move/tsconfig': latest.tsconfig,
                },
                scripts: {
                  'lint:type': 'tsc --noEmit',
                },
              }
            : undefined,
          useLint || commitlint
            ? {
                devDependencies: {
                  '@nice-move/cli': latest.cli,
                },
              }
            : undefined,
          useLint
            ? {
                scripts: {
                  'lint:staged': 'nice-move lint staged',
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
                  snapshot: 'ava --fail-fast -u',
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
          syncpack
            ? {
                devDependencies: {
                  '@nice-move/syncpack-config': latest['syncpack-config'],
                  syncpack: latest.syncpack,
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
            ? {
                dependencies: {
                  tailwindcss: latest.tailwindcss,
                },
                devDependencies: {
                  'prettier-plugin-tailwindcss': prettier
                    ? latest['prettier-plugin-tailwindcss']
                    : undefined,
                },
              }
            : undefined,
          playwright
            ? {
                scripts: {
                  'pretest:e2e': 'npm link @playwright/test',
                  'test:e2e': 'playwright test',
                },
              }
            : undefined,
          bringItSFTP
            ? {
                devDependencies: {
                  '@bring-it/sftp': latest['@bring-it/sftp'],
                },
              }
            : undefined,
          bringItNPM
            ? {
                devDependencies: {
                  '@bring-it/npm': latest['@bring-it/npm'],
                },
              }
            : undefined,
          bestShot
            ? {
                devDependencies: {
                  'best-shot': latest['best-shot'],
                },
                'nice-move': {
                  globals: {
                    BEST_SHOT: 'readonly',
                  },
                },
                scripts: {
                  build: 'best-shot prod',
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
    'tailwindcss',
    'react',
    'vue',
    'typescript',
    'commitlint',
    'eslint',
    'stylelint',
    'prettier',
    'syncpack',
    'garou',
    'ava',
    'playwright',
    '@bring-it/sftp',
    '@bring-it/npm',
    'best-shot',
  ];

  const { dependencies = {}, devDependencies = {} } = getPkg();

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
        return (isRoot) =>
          action(
            isRoot,
            Object.fromEntries(keywords.map((item) => [item, true])),
          );
      }
    },
  };
}
