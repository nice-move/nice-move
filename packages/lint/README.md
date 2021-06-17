# @nice-move/lint

Lint and format everything.

[![npm][npm-badge]][npm-url]
[![github][github-badge]][github-url]
![node][node-badge]

[npm-url]: https://www.npmjs.com/package/@nice-move/lint
[npm-badge]: https://img.shields.io/npm/v/@nice-move/lint.svg?style=flat-square&logo=npm
[github-url]: https://github.com/nice-move/nice-move/tree/master/packages/lint
[github-badge]: https://img.shields.io/npm/l/@nice-move/lint.svg?style=flat-square&colorB=blue&logo=github
[node-badge]: https://img.shields.io/node/v/@nice-move/lint.svg?style=flat-square&colorB=green&logo=node.js

## Installation

```bash
npm install @nice-move/lint --save-dev
```

## Usage

Install `eslint` / `stylelint` / `prettier` / `garou` / `rustywind` when needed:

```bash
npm install eslint stylelint prettier garou --save-dev
```

Add configurations:

```json
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
npx --no-install nice-move-lint
```

## Tips

If [@nice-move/cli](https://github.com/nice-move/nice-move/tree/master/packages/cli) is installed, you can run `nice-move lint` command, cli will run `nice-move-lint` internally.
