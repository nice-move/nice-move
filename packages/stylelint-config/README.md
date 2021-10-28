# @nice-move/stylelint-config <img src="https://cdn.worldvectorlogo.com/logos/stylelint.svg" alt="logo" height="80" align="right">

A [stylelint] config created by personal preferences.

[![npm][npm-badge]][npm-url]
[![github][github-badge]][github-url]
![node][node-badge]

[stylelint]: https://stylelint.io/
[npm-url]: https://www.npmjs.com/package/@nice-move/stylelint-config
[npm-badge]: https://img.shields.io/npm/v/@nice-move/stylelint-config.svg?style=flat-square&logo=npm
[github-url]: https://github.com/nice-move/nice-move/tree/master/packages/stylelint-config
[github-badge]: https://img.shields.io/npm/l/@nice-move/stylelint-config.svg?style=flat-square&colorB=blue&logo=github
[node-badge]: https://img.shields.io/node/v/@nice-move/stylelint-config.svg?style=flat-square&colorB=green&logo=node.js

## Installation

```bash
npm install stylelint @nice-move/stylelint-config --save-dev
```

## Usage

Add to package.json

```jsonc
// example: package.json
{
  "stylelint": {
    "extends": "@nice-move/stylelint-config"
  }
}
```

Then run

```bash
stylelint --fix **/*.{vue,css,less,scss,html,htm,svg,md}
```

## Tips

Some rules that covering by [garou](https://github.com/nice-move/garou) are disabled.
