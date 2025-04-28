# @nice-move/eslint-config-base [<img src="https://cdn.worldvectorlogo.com/logos/eslint-1.svg" alt="eslint" height="80" align="right">][eslint]

A [eslint] config for best practice.

[![npm][npm-badge]][npm-url]
[![github][github-badge]][github-url]
![node][node-badge]

[eslint]: https://eslint.org/
[npm-url]: https://www.npmjs.com/package/@nice-move/eslint-config-base
[npm-badge]: https://img.shields.io/npm/v/@nice-move/eslint-config-base.svg?style=flat-square&logo=npm
[github-url]: https://github.com/nice-move/nice-move/tree/master/packages/eslint-config-base
[github-badge]: https://img.shields.io/npm/l/@nice-move/eslint-config-base.svg?style=flat-square&colorB=blue&logo=github
[node-badge]: https://img.shields.io/node/v/@nice-move/eslint-config-base.svg?style=flat-square&colorB=green&logo=node.js

## Installation

```bash
npm install eslint @nice-move/eslint-config-base --save-dev
```

## Usage

Add to eslint.config.mjs

```js
// example: eslint.config.mjs
export { default } from '@nice-move/eslint-config-base';
```

Then run

```bash
eslint --fix .
```

## Specification

| Environment | pattern                                |
| :---------- | :------------------------------------- |
| browser     | `.js`, `.html`                         |
| node.js     | `.mjs`, `.mts`, `.cjs`, `.cts`         |
| es modules  | `.mjs`, `.mts`, `.js`, `.html`         |
| commonjs    | `.cjs`, source code in webpack project |

## Tips

### Noiseless reporting

Rules can handle by [prettier](https://prettier.io/) and [garou](https://github.com/nice-move/garou) is disabled by default.

## Related

- [@nice-move/eslint-config-react](../eslint-config-react/)
- [@nice-move/eslint-config-vue](../eslint-config-vue/)
