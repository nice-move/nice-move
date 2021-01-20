const { Json } = require('fs-chain');
const deepmerge = require('deepmerge');
const prompt = require('./prompt.cjs');

const { pkgCwd } = require('./utils.cjs');

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

function checkEslint({
  dependencies = {},
  vue = 'vue' in dependencies,
  react = 'react' in dependencies,
}) {
  const type =
    (react && vue) || (!react && !vue) ? 'base' : react ? 'react' : 'vue';

  return {
    eslintConfig: {
      extends: `@nice-move/eslint-config-${type}`,
    },
    devDependencies: {
      [`@nice-move/eslint-config-${type}`]: '^0.5.14',
      eslint: '^7.18.0',
    },
  };
}

module.exports = async function autoPackage() {
  const pkg = pkgCwd();

  const { devDependencies = {}, dependencies = {} } = pkg;

  await prompt({
    message: 'Pick your project keywords',
    choices: [
      {
        title: 'husky',
        value: 'husky',
        selected: !('husky' in devDependencies),
      },
      {
        title: 'garou',
        value: 'garou',
        selected: !('garou' in devDependencies),
      },
      {
        title: 'ava',
        value: 'ava',
        selected: !('ava' in devDependencies),
      },
      {
        title: 'commitlint',
        value: 'commitlint',
        selected: !(
          'commitlint' in devDependencies ||
          '@commitlint/cli' in devDependencies
        ),
      },
      {
        title: 'eslint',
        value: 'eslint',
        selected: !('eslint' in devDependencies),
      },
      {
        title: 'stylelint',
        value: 'stylelint',
        selected: !('stylelint' in devDependencies),
      },
      {
        title: 'prettier',
        value: 'prettier',
        selected: !('prettier' in devDependencies),
      },
      {
        title: 'react',
        value: 'react',
        selected: !('react' in dependencies),
      },
      {
        title: 'vue',
        value: 'vue',
        selected: !('vue' in dependencies),
      },
    ],
    callback({
      ava,
      commitlint,
      eslint,
      garou,
      husky,
      prettier,
      react,
      stylelint,
      vue,
    }) {
      new Json()
        .source('~package.json')
        .config({ pretty: true })
        .handle((old) =>
          deepmerge.all(
            [
              {
                engines: {
                  node: '^12.18 || ^14',
                },
              },
              pkg.private
                ? undefined
                : {
                    publishConfig: {
                      access: 'public',
                      registry: 'https://registry.npmjs.org/',
                    },
                  },
              old,
              {
                devDependencies: {
                  '@nice-move/cli': '^0.5',
                },
              },
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
                      garou: '^0.1.10',
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
              eslint || stylelint || prettier || garou
                ? {
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
              eslint ? checkEslint({ react, vue, dependencies }) : undefined,
              stylelint
                ? {
                    devDependencies: {
                      '@nice-move/stylelint-config': '^0.5.2',
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
                      prettier: '^2.2.1',
                    },
                    prettier: '@nice-move/prettier-config',
                  }
                : undefined,
              react
                ? {
                    dependencies: { react: '~16.14.0' },
                    devDependencies: { '@types/react': '^16.14.2' },
                  }
                : undefined,
              vue ? { dependencies: { vue: '~2.6.12' } } : undefined,
            ].filter(Boolean),
          ),
        )
        .handle(format)
        .output();
    },
  });
};
