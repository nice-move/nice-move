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

## Supports

- Stylesheet in \*.{vue,html,htm,svg,md}
- [SCSS syntax](https://sass-lang.com/documentation/syntax#scss) / [Less syntax](https://lesscss.org/#overview)
- [CSS Modules exceptions - :global / :local](https://github.com/css-modules/css-modules#exceptions) in \*.module.{css,scss,less}, \*.vue
- [Interoperable CSS (ICSS) - :export](https://github.com/css-modules/icss#export) in \*.module.{css,scss,less}, \*.vue
- [Tailwind CSS](https://tailwindcss.com/) at rules when `tailwindcss` installed
- Mini Progarm Stylesheet limitation when needed

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

```sh
stylelint --fix "**/*.{css,less,scss,vue,html,htm,md}"
```

## Tips

Some rules that covering by [Prettier](https://prettier.io/) / [Garou](https://github.com/nice-move/garou) are disabled.
