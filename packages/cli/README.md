# @nice-move/cli

Frontend develop helper for frontend development.

[![npm][npm-badge]][npm-url]
[![github][github-badge]][github-url]
![node][node-badge]

[npm-url]: https://www.npmjs.com/package/@nice-move/cli
[npm-badge]: https://img.shields.io/npm/v/@nice-move/cli.svg?style=flat-square&logo=npm
[github-url]: https://github.com/airkro/nice-move/tree/master/packages/cli
[github-badge]: https://img.shields.io/npm/l/@nice-move/cli.svg?style=flat-square&colorB=blue&logo=github
[node-badge]: https://img.shields.io/node/v/@nice-move/cli.svg?style=flat-square&colorB=green&logo=node.js

## Installation

```bash
npm install @nice-move/cli --save-dev
```

## Usage

```bash
npx -c nice-move <command>
```

## Commands

### init

Initialize your frontend workspaces.

- Confirm when workspace not empty or repository not clean
- Run `git init` when workspace not a git project
- Run a better `npm init` / `yarn init` command when needed
- Create or overwrite `.gitignore` / `.gitattributes`
- Create or overwrite `LICENSE` / `.editorconfig`
- Create `README.md` when it not exists
- Set registry to China mirror in `.npmrc` / `.yarnrc`
- Add or reset project dependencies by interactive
- Run `npm` / `yarn` install command

### lint

Lint and format everything.

Install `eslint` / `stylelint` / `prettier` / `garou` when needed:

```bash
npm install eslint stylelint prettier garou --save-dev
```

Add configurations:

```json
// example: package.json
{
  "eslintConfig": {},
  "prettier": {},
  "stylelint": {}
}
```

Change a few files, then run:

```bash
git add .
npx -c nice-move lint
```

#### Use with `husky`

```bash
npm install husky --save-dev
```

```json
// example: package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "nice-move lint"
    }
  }
}
```
