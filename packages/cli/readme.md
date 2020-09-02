# @nice-move/cli

Initializer, linter, and formatter for frontend development.

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

Initialize your workspaces.

This command will create or overwrite `.npmrc`, `.yarnrc`, `package.json`, `LICENSE`, `.editorconfig`, `.gitignore`, `.gitattributes`.

### lint

Lint and format everything.

Install `eslint` / `stylelint` / `prettier` if you need to.

```bash
npm install eslint stylelint prettier --save-dev
```

Add configurations in the way you are used to doing.

```json
// example: package.json
{
  "eslintConfig": ...,
  "prettier": ...,
  "stylelint": ...
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
