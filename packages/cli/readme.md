# @nice-move/cli

[![npm][npm-badge]][npm-url]
[![license][license-badge]][github-url]
![node][node-badge]

Run [lint-staged] with `nice-move` config.

## Installation

```bash
yarn add @nice-move/cli -D
```

Install eslint / stylelint / prettier if you need to.

```bash
yarn add eslint stylelint prettier -D
```

## Configuration

Add configurations the way you are used to doing.

```json
// example: package.json
{
  "eslintConfig": {
    "extends": "@nice-move/eslint-config-base"
  },
  "prettier": "@nice-move/prettier-config",
  "stylelint": {
    "extends": "@nice-move/stylelint-config"
  }
}
```

## Usage

Change a few files, then run:

```bash
git add .
yarn run nice-move
```

### Use with `husky`

```bash
yarn add husky -D
```

```json
// example: package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "nice-move"
    }
  }
}
```

```bash
git add .
git commit -m "example"
```

[lint-staged]: https://github.com/okonet/lint-staged#readme
[npm-url]: https://www.npmjs.com/package/@nice-move/cli
[npm-badge]: https://img.shields.io/npm/v/@nice-move/cli.svg?style=flat-square&logo=npm
[github-url]: https://github.com/airkro/nice-move/tree/master/packages/cli#readme
[node-badge]: https://img.shields.io/node/v/@nice-move/cli.svg?style=flat-square&colorB=green&logo=node.js
[license-badge]: https://img.shields.io/npm/l/@nice-move/cli.svg?style=flat-square&colorB=blue&logo=github
