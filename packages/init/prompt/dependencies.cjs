const { Json } = require('fs-chain');
const deepmerge = require('deepmerge');

function format(data) {
  try {
    // eslint-disable-next-line import/no-extraneous-dependencies
    const prettier = require('prettier');

    return prettier
      .resolveConfig('./package.json')
      .then((options) => prettier.format(JSON.stringify(data), options))
      .then(JSON.parse);
  } catch {
    return data;
  }
}

function checkEslint({ vue, react }) {
  const type =
    (react && vue) || (!react && !vue) ? 'base' : react ? 'react' : 'vue';

  return {
    eslintConfig: {
      extends: `@nice-move/eslint-config-${type}`,
    },
    devDependencies: {
      [`@nice-move/eslint-config-${type}`]: '^0.5.22',
      eslint: '^7.20.0',
    },
  };
}

const message = 'Add/Reset project dependencies';

function Dependencies(wanted = {}) {
  return new Json()
    .source('~package.json')
    .config({ pretty: true })
    .handle((old) => {
      const { devDependencies = {}, dependencies = {} } = old;
      const {
        ava = 'ava' in devDependencies,
        commitlint = 'commitlint' in devDependencies,
        eslint = 'eslint' in devDependencies,
        garou = 'garou' in devDependencies,
        husky = 'husky' in devDependencies,
        prettier = 'prettier' in devDependencies,
        react = 'react' in dependencies,
        stylelint = 'stylelint' in devDependencies,
        vue = 'vue' in dependencies,
      } = wanted;

      const useLint = eslint || stylelint || prettier || garou;

      const prepublishOnly =
        [
          useLint ? 'nice-move lint' : undefined,
          ava ? 'ava --fail-fast' : undefined,
        ]
          .filter(Boolean)
          .join(' && ') || undefined;
      return deepmerge.all(
        [
          old,
          husky || commitlint
            ? {
                devDependencies: {
                  husky: '^4.3.8',
                },
              }
            : undefined,
          garou
            ? {
                devDependencies: {
                  garou: '^0.1.12',
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
          useLint
            ? {
                devDependencies: {
                  '@nice-move/cli': '^0.5.15',
                },
                scripts: {
                  lint: 'nice-move lint',
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
                devDependencies: { ava: '^3.15.0' },
                scripts: {
                  prepublishOnly: old.private ? undefined : prepublishOnly,
                  test: 'ava --verbose',
                },
                husky: husky
                  ? {
                      hooks: {
                        'pre-commit': prepublishOnly,
                      },
                    }
                  : undefined,
              }
            : undefined,
          eslint ? checkEslint({ react, vue }) : undefined,
          stylelint
            ? {
                devDependencies: {
                  '@nice-move/stylelint-config': '^0.5.3',
                  stylelint: '^13.10.0',
                },
                stylelint: {
                  extends: '@nice-move/stylelint-config',
                },
              }
            : undefined,
          prettier
            ? {
                devDependencies: {
                  '@nice-move/prettier-config': '^0.4.1',
                  prettier: '^2.2.1',
                },
                prettier: '@nice-move/prettier-config',
              }
            : undefined,
          react
            ? {
                dependencies: { react: '~16.14.0' },
                devDependencies: { '@types/react': '^16.14.4' },
              }
            : undefined,
          vue ? { dependencies: { vue: '~2.6.12' } } : undefined,
        ].filter(Boolean),
      );
    })
    .handle(format)
    .output()
    .logger(message)
    .catch(console.warn);
}

exports.prompt = () => ({
  instructions: false,
  optionsPerPage: 20,
  message,
  name: 'Dependencies',
  type: (first) => (first === false ? null : 'multiselect'),
  choices: [
    {
      title: 'husky',
      value: 'husky',
    },
    {
      title: 'garou',
      value: 'garou',
    },
    {
      title: 'ava',
      value: 'ava',
    },
    {
      title: 'commitlint',
      value: 'commitlint',
    },
    {
      title: 'eslint',
      value: 'eslint',
    },
    {
      title: 'stylelint',
      value: 'stylelint',
    },
    {
      title: 'prettier',
      value: 'prettier',
    },
    {
      title: 'react',
      value: 'react',
    },
    {
      title: 'vue',
      value: 'vue',
    },
  ],
  // eslint-disable-next-line consistent-return
  format: (keywords) => {
    if (keywords.length > 0) {
      return () =>
        Dependencies(Object.fromEntries(keywords.map((item) => [item, true])));
    }
  },
});
