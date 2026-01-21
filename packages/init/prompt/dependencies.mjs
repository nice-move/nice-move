import { deepmerge } from 'deepmerge-ts';
import { Json, Text } from 'fs-chain';

import latest from '../lib/latest.mjs';
import { getPkg } from '../lib/utils.mjs';

function checkEslint({ vue, react }) {
  const type =
    (react && vue) || (!react && !vue) ? 'base' : react ? 'react' : 'vue';

  return {
    devDependencies: {
      [`@nice-move/eslint-config-${type}`]:
        latest['@nice-move/eslint-config-base'],
      eslint: latest.eslint,
    },
    scripts: {
      'lint:eslint': 'eslint . --quiet --fix --concurrency=auto',
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
        useLint ? 'pnpm run lint:staged' : undefined,
        typescript ? 'pnpm run lint:type' : undefined,
        ava ? 'pnpm test' : undefined,
      ].filter(Boolean);

      if (prepublishOnly.length > 0) {
        await new Text()
          .onDone(() =>
            [
              '#!/bin/sh',
              '',
              ...prepublishOnly.map((line, idx, lines) =>
                idx === lines - 1 ? line : `${line} || exit 1`,
              ),
              '',
            ].join('\n'),
          )
          .output('.githooks/pre-commit');
      }

      if (commitlint) {
        await new Text()
          .onDone(() =>
            ['#!/bin/sh', 'pnpm exec nice-move lint commit', ''].join('\n\n'),
          )
          .output('.githooks/commit-msg');
      }

      if (eslint) {
        await new Text()
          .onDone(() =>
            [
              react
                ? "import config from '@nice-move/eslint-config-react';"
                : vue
                  ? "import config from '@nice-move/eslint-config-vue';"
                  : "import config from '@nice-move/eslint-config-base';",
              'export default [...config];',
              '',
            ].join('\n\n'),
          )
          .output('eslint.config.mjs');
      }

      if (syncpack) {
        await new Text()
          .onDone(() =>
            [
              '// @ts-check',
              "// import defineConfig from '@nice-move/syncpack-config/define.mjs';",
              '// export default defineConfig(import.meta.url, {});',
              "export { default } from '@nice-move/syncpack-config';",
            ].join('\n\n'),
          )
          .output('syncpack.config.mjs');
      }

      if (typescript) {
        await new Json()
          .config({ pretty: true })
          .onDone(() => ({
            extends: react
              ? '@nice-move/tsconfig/react.json'
              : vue
                ? '@nice-move/tsconfig/vue.json'
                : '@nice-move/tsconfig/base.json',
            compilerOptions: {
              noEmit: true,
            },
          }))
          .output('tsconfig.json');
      }

      return deepmerge(
        ...[
          old,
          {
            scripts: {
              prepare: 'nice-move git hooks',
            },
          },
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
                  '@nice-move/tsconfig': latest.tsconfig,
                },
                scripts: {
                  'lint:type': 'tsc -p tsconfig.json',
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
                ava: {
                  extensions: ['mts', 'mjs'],
                },
                devDependencies: {
                  ava: latest.ava,
                  ...(eslint
                    ? {
                        'eslint-plugin-ava': latest['eslint-plugin-ava'],
                      }
                    : undefined),
                },
                scripts: {
                  prepublishOnly:
                    !old.private && prepublishOnly.length > 0
                      ? prepublishOnly.join(' && ')
                      : undefined,
                  test: 'ava --fail-fast',
                  snapshot: 'ava --fail-fast -u',
                },
              }
            : undefined,
          eslint ? checkEslint({ react, vue }) : undefined,
          stylelint
            ? {
                devDependencies: {
                  '@nice-move/stylelint-config':
                    latest['@nice-move/stylelint-config'],
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
                  '@nice-move/syncpack-config':
                    latest['@nice-move/syncpack-config'],
                  syncpack: latest.syncpack,
                },
                scripts: {
                  'lint:version': 'syncpack lint',
                  'version:pin': 'syncpack fix-mismatches',
                },
              }
            : undefined,
          prettier
            ? {
                devDependencies: {
                  '@nice-move/prettier-config':
                    latest['@nice-move/prettier-config'],
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
                devDependencies: {
                  '@types/react': latest['@types/react'],
                  '@types/react-dom': latest['@types/react-dom'],
                },
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
                  'pretest:e2e': 'pnpm link @playwright/test',
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
