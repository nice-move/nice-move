import base from '@nice-move/all-in-vue/eslint';

export default [
  ...base,
  {
    // pnpmfile 是 node 脚本，必须直接使用 node 内置模块
    files: ['packages/pnpm-plugin-playwright/src/pnpmfile.mts'],
    rules: {
      'import-x/no-nodejs-modules': 'off',
    },
  },
  {
    // dist/ 是 tsdown 的编译产物，不纳入 lint
    ignores: ['packages/pnpm-plugin-playwright/dist'],
  },
  {
    files: ['packages/init/bin/index.mjs', 'packages/cli/src/index.mjs'],
    rules: {
      'n/hashbang': 'off',
    },
  },
];
