# @nice-move/init

Initialize your workspaces.

[![npm][npm-badge]][npm-url]
[![github][github-badge]][github-url]
![node][node-badge]

[npm-url]: https://www.npmjs.com/package/@nice-move/init
[npm-badge]: https://img.shields.io/npm/v/@nice-move/init.svg?style=flat-square&logo=npm
[github-url]: https://github.com/airkro/nice-move/tree/master/packages/init
[github-badge]: https://img.shields.io/npm/l/@nice-move/init.svg?style=flat-square&colorB=blue&logo=github
[node-badge]: https://img.shields.io/node/v/@nice-move/init.svg?style=flat-square&colorB=green&logo=node.js

## Usage

```bash
mkdir sample
cd sample
npm init # or yarn init
npx @nice-move/init
```

## Features

- Run `git init` when current workspace is not a git project
- Create or overwrite `.gitignore`, `.gitattributes`
- Create or overwrite `package.json`, `LICENSE`, `.editorconfig`,
- Create or overwrite `.npmrc`, `.yarnrc`
