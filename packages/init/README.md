# @nice-move/init

Initialize your frontend workspaces.

[![npm][npm-badge]][npm-url]
[![github][github-badge]][github-url]
![node][node-badge]

[npm-url]: https://www.npmjs.com/package/@nice-move/init
[npm-badge]: https://img.shields.io/npm/v/@nice-move/init.svg?style=flat-square&logo=npm
[github-url]: https://github.com/nice-move/nice-move/tree/master/packages/init
[github-badge]: https://img.shields.io/npm/l/@nice-move/init.svg?style=flat-square&colorB=blue&logo=github
[node-badge]: https://img.shields.io/node/v/@nice-move/init.svg?style=flat-square&colorB=green&logo=node.js

## Usage

```bash
mkdir sample # when needed

cd sample

npx @nice-move/init
```

## Features

- Confirm when workspace not empty or repository not clean
- Run `git init` when workspace not a git project
- Run a better `npm init` / `yarn init` command when needed
- Create or overwrite `.gitignore` / `.gitattributes`
- Create or overwrite `LICENSE` / `.editorconfig`
- Create `README.md` when it not exists
- Set registry to China mirror in `.npmrc` / `.yarnrc`
- Add or reset project dependencies by interactive
- Run `npm` / `yarn` install command

## Related

- [@nice-move/cli](../cli)
- [@nice-move/lint](../lint)
