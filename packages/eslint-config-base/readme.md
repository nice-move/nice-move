# @nice-move/eslint-config-base [<img src="https://cdn.worldvectorlogo.com/logos/eslint-1.svg" alt="eslint" height="80" align="right">][eslint]

[![npm][npm-badge]][npm-url]
[![license][license-badge]][github-url]
![node][node-badge]

A [Eslint] config created by personal preferences.

## Installation

```bash
npm install eslint @nice-move/eslint-config-base --save-dev
```

## Usage

Add to package.json

```json
{
  "eslintConfig": {
    "extends": "@nice-move/eslint-config-base"
  }
}
```

Then run

```bash
eslint --fix **/*.{js,cjs,mjs}
```

[eslint]: https://eslint.org/
[npm-url]: https://www.npmjs.com/package/@nice-move/eslint-config-base
[npm-badge]: https://img.shields.io/npm/v/@nice-move/eslint-config-base.svg?style=flat-square&logo=npm
[github-url]: https://github.com/airkro/nice-move/tree/master/packages/eslint-config-base#readme
[node-badge]: https://img.shields.io/node/v/@nice-move/eslint-config-base.svg?style=flat-square&colorB=green&logo=node.js
[license-badge]: https://img.shields.io/npm/l/@nice-move/eslint-config-base.svg?style=flat-square&colorB=blue&logo=github
