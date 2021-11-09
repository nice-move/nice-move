# @nice-move/cli

Frontend develop helper for frontend development.

[![npm][npm-badge]][npm-url]
[![github][github-badge]][github-url]
![node][node-badge]

[npm-url]: https://www.npmjs.com/package/@nice-move/cli
[npm-badge]: https://img.shields.io/npm/v/@nice-move/cli.svg?style=flat-square&logo=npm
[github-url]: https://github.com/nice-move/nice-move/tree/master/packages/cli
[github-badge]: https://img.shields.io/npm/l/@nice-move/cli.svg?style=flat-square&colorB=blue&logo=github
[node-badge]: https://img.shields.io/node/v/@nice-move/cli.svg?style=flat-square&colorB=green&logo=node.js

## Installation

```bash
npm install @nice-move/cli --save-dev
```

## Usage

```bash
npx --no-install nice-move <command>
```

## Commands

### lint

Lint and format everything.

Install `eslint` / `stylelint` / `prettier` / `garou` when needed:

```bash
npm install eslint stylelint prettier garou --save-dev
```

Add configurations:

```jsonc
// example: package.json
{
  "eslintConfig": {},
  "prettier": {},
  "stylelint": {},
  "garou": {}
}
```

Change a few files, then run:

```bash
git add .
npx --no-install nice-move lint
```

## Related

- [@nice-move/init](../init)
- [@nice-move/lint](../lint)
