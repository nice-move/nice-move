# @nice-move/prettier-config [<img src="https://raw.githubusercontent.com/prettier/prettier-logo/master/images/prettier-icon-light.png" alt="prettier" height="80" align="right">][prettier]

[![npm][npm-badge]][npm-url]
[![license][license-badge]][github-url]
![node][node-badge]

A [Prettier] config created by personal preferences.

## Installation

```bash
npm install prettier @nice-move/prettier-config --save-dev
```

## Usage

Add to package.json

```json
{
  "prettier": "@nice-move/prettier-config"
}
```

Then run

```bash
prettier --write **/*.{js,jsx,vue,css,scss,md}
prettier --write **/*.{html,json,toml,yaml,yml}
```

[prettier]: https://prettier.io/
[npm-url]: https://www.npmjs.com/package/@nice-move/prettier-config
[npm-badge]: https://img.shields.io/npm/v/@nice-move/prettier-config.svg?style=flat-square&logo=npm
[github-url]: https://github.com/airkro/nice-move/tree/master/packages/prettier-config#readme
[node-badge]: https://img.shields.io/node/v/@nice-move/prettier-config.svg?style=flat-square&colorB=green&logo=node.js
[license-badge]: https://img.shields.io/npm/l/@nice-move/prettier-config.svg?style=flat-square&colorB=blue&logo=github
