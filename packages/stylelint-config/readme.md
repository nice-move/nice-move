<a href="https://stylelint.io/">
  <img alt="stylelint" src="./lib/stylelint-logo.svg" height="120">
</a>

# @nice-move/stylelint-config

[![npm][npm-badge]][npm-url]
[![license][license-badge]][github-url]
![node][node-badge]

A [Stylelint] config created by personal preferences.

## Installation

```bash
npm install stylelint @nice-move/stylelint-config --save-dev
```

## Usage

Add to package.json

```json
{
  "stylelint": {
    "extends": "@nice-move/stylelint-config"
  }
}
```

Then run

```bash
stylelint --fix **/*.{vue,css,less,scss}
```

[stylelint]: https://stylelint.io/
[npm-url]: https://www.npmjs.com/package/@nice-move/stylelint-config
[npm-badge]: https://img.shields.io/npm/v/@nice-move/stylelint-config.svg?style=flat-square&logo=npm
[github-url]: https://github.com/airkro/nice-move/tree/master/packages/stylelint-config#readme
[node-badge]: https://img.shields.io/node/v/@nice-move/stylelint-config.svg?style=flat-square&colorB=green&logo=node.js
[license-badge]: https://img.shields.io/npm/l/@nice-move/stylelint-config.svg?style=flat-square&colorB=blue&logo=github
