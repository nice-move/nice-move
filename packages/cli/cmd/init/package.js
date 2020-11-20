const { Json } = require('fs-chain');
const deepmerge = require('deepmerge');
const prompts = require('prompts');

const { pkgCwd } = require('../../lib');

module.exports = function autoPackage() {
  const pkg = pkgCwd();

  // eslint-disable-next-line unicorn/consistent-function-scoping
  function checkEslint({ vue, react }) {
    const type =
      (react && vue) || (!react && !vue) ? 'base' : react ? 'react' : 'vue';

    return {
      eslintConfig: {
        extends: `@nice-move/eslint-config-${type}`,
      },
      devDependencies: {
        [`@nice-move/eslint-config-${type}`]: '^0.3.12',
        eslint: '^6.8.0',
      },
    };
  }

  const { devDependencies = {}, dependencies = {} } = pkg;

  prompts({
    type: 'multiselect',
    name: 'actions',
    message: 'Pick your project keywords',
    format: (actions) =>
      Object.fromEntries(actions.map((item) => [item, true])),
    choices: [
      {
        title: 'husky',
        value: 'husky',
        selected: 'husky' in devDependencies,
      },
      {
        title: 'ava',
        value: 'ava',
        selected: 'ava' in devDependencies,
      },
      {
        title: 'commitlint',
        value: 'commitlint',
        selected:
          'commitlint' in devDependencies ||
          '@commitlint/cli' in devDependencies,
      },
      {
        title: 'eslint',
        value: 'eslint',
        selected: 'eslint' in devDependencies,
      },
      {
        title: 'stylelint',
        value: 'stylelint',
        selected: 'stylelint' in devDependencies,
      },
      {
        title: 'prettier',
        value: 'prettier',
        selected: 'prettier' in devDependencies,
      },
      {
        title: 'react',
        value: 'react',
        selected: 'react' in dependencies,
      },
      {
        title: 'vue',
        value: 'vue',
        selected: 'vue' in dependencies,
      },
    ],
  })
    .then(
      ({
        actions: {
          husky,
          ava,
          eslint,
          react,
          vue,
          stylelint,
          prettier,
          commitlint,
        } = {},
      }) => {
        if (
          husky ||
          ava ||
          eslint ||
          react ||
          vue ||
          stylelint ||
          prettier ||
          commitlint
        ) {
          new Json()
            .source('./package.json')
            .config({ pretty: true })
            .handle((old) => {
              return deepmerge.all(
                [
                  {
                    engines: {
                      node: '^12.14 || ^14',
                    },
                  },
                  pkg.private
                    ? undefined
                    : {
                        publishConfig: {
                          registry: 'https://registry.npmjs.org/',
                        },
                      },
                  old,
                  husky || commitlint
                    ? {
                        devDependencies: {
                          husky: '^4.3.0',
                        },
                      }
                    : undefined,
                  commitlint
                    ? {
                        commitlint: {
                          extends: '@nice-move/commitlint-config',
                        },
                        husky: {
                          hooks: {
                            'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
                          },
                        },
                        devDependencies: {
                          commitlint: '^11.0.0',
                          '@nice-move/commitlint-config': '^0.0.0',
                        },
                      }
                    : undefined,
                  eslint || stylelint || prettier
                    ? {
                        scripts: {
                          format: 'nice-move lint',
                        },
                        husky: husky
                          ? {
                              hooks: {
                                'pre-commit': 'nice-move lint',
                              },
                            }
                          : undefined,
                      }
                    : undefined,
                  ava
                    ? {
                        devDependencies: { ava: '^3.13.0' },
                        scripts: {
                          test: 'ava --verbose',
                        },
                        husky: husky
                          ? {
                              hooks: {
                                'pre-commit':
                                  eslint || stylelint || prettier
                                    ? 'nice-move lint && ava --verbose'
                                    : 'ava --verbose',
                              },
                            }
                          : undefined,
                      }
                    : undefined,
                  eslint ? checkEslint({ react, vue }) : undefined,
                  stylelint
                    ? {
                        devDependencies: {
                          '@nice-move/stylelint-config': '^0.4.2',
                          stylelint: '^13.8.0',
                        },
                        stylelint: {
                          extends: '@nice-move/stylelint-config',
                        },
                      }
                    : undefined,
                  prettier
                    ? {
                        devDependencies: {
                          '@nice-move/prettier-config': '^0.3.5',
                          prettier: '^2.1.2',
                        },
                        prettier: '@nice-move/prettier-config',
                      }
                    : undefined,
                  react
                    ? {
                        dependencies: { react: '~16.14.0' },
                        devDependencies: { '@types/react': '^16.9.55' },
                      }
                    : undefined,
                  vue ? { dependencies: { vue: '~2.6.12' } } : undefined,
                ].filter(Boolean),
              );
            })
            .output();
        }
      },
    )
    .catch(console.error);
};
