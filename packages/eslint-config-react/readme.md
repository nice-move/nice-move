# @nice-move/eslint-config-react [<img src="https://cdn.worldvectorlogo.com/logos/eslint-1.svg" alt="eslint" height="80" align="right">][eslint]

A `eslint` config created by personal preferences.

[![npm][npm-badge]][npm-url]
[![github][github-badge]][github-url]
![node][node-badge]

[npm-url]: https://www.npmjs.com/package/@nice-move/eslint-config-react
[npm-badge]: https://img.shields.io/npm/v/@nice-move/eslint-config-react.svg?style=flat-square&logo=npm
[github-url]: https://github.com/airkro/nice-move/tree/master/packages/eslint-config-react
[github-badge]: https://img.shields.io/npm/l/@nice-move/eslint-config-react.svg?style=flat-square&colorB=blue&logo=github
[node-badge]: https://img.shields.io/node/v/@nice-move/eslint-config-react.svg?style=flat-square&colorB=green&logo=node.js

## Installation

```bash
npm install eslint @nice-move/eslint-config-react --save-dev
```

## Usage

Add to package.json

```json
{
  "eslintConfig": {
    "extends": "@nice-move/eslint-config-react"
  }
}
```

Then run

```bash
eslint --fix **/*.{js,jsx,cjs,mjs,md,html}
```
