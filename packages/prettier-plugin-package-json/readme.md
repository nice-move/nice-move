# @nice-move/prettier-plugin-package-json [<img src="https://raw.githubusercontent.com/prettier/prettier-logo/master/images/prettier-icon-light.png" alt="prettier" height="80" align="right">][prettier]

[![npm][npm-badge]][npm-url]
[![license][license-badge]][github-url]
![node][node-badge]

A [Prettier] plugin using [prettier-package-json] to make package.json prettier.

Read about [npm-package.json](https://docs.npmjs.com/files/package.json.html).

## Installation

```bash
npm install prettier @nice-move/prettier-plugin-package-json --save-dev
```

## Usage

```bash
prettier --write **/package.json
```

## Feature

- Sort `package.json` fields in a preset order
- Expand `author` and `contributors` fields into objects
- Remove deprecated fields like `preferGlobal`, `engineStrict`
- Merge `bundleDependencies` into `bundledDependencies`
- Rename `esnext` to `module`, rename `typings` to `types`

[prettier]: https://prettier.io/
[prettier-package-json]: https://github.com/cameronhunter/prettier-package-json
[npm-url]: https://www.npmjs.com/package/@nice-move/prettier-plugin-package-json
[npm-badge]: https://img.shields.io/npm/v/@nice-move/prettier-plugin-package-json.svg?style=flat-square&logo=npm
[github-url]: https://github.com/airkro/nice-move/tree/master/packages/prettier-plugin-package-json#readme
[node-badge]: https://img.shields.io/node/v/@nice-move/prettier-plugin-package-json.svg?style=flat-square&colorB=green&logo=node.js
[license-badge]: https://img.shields.io/npm/l/@nice-move/prettier-plugin-package-json.svg?style=flat-square&colorB=blue&logo=github
