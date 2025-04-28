# @nice-move/eslint-config-react [<img src="https://cdn.worldvectorlogo.com/logos/eslint-1.svg" alt="eslint" height="80" align="right">][eslint]

A [eslint] config for [react] project best practice.

[![npm][npm-badge]][npm-url]
[![github][github-badge]][github-url]
![node][node-badge]

[react]: https://reactjs.org/
[eslint]: https://eslint.org/
[npm-url]: https://www.npmjs.com/package/@nice-move/eslint-config-react
[npm-badge]: https://img.shields.io/npm/v/@nice-move/eslint-config-react.svg?style=flat-square&logo=npm
[github-url]: https://github.com/nice-move/nice-move/tree/master/packages/eslint-config-react
[github-badge]: https://img.shields.io/npm/l/@nice-move/eslint-config-react.svg?style=flat-square&colorB=blue&logo=github
[node-badge]: https://img.shields.io/node/v/@nice-move/eslint-config-react.svg?style=flat-square&colorB=green&logo=node.js

## Installation

```bash
npm install eslint @nice-move/eslint-config-react --save-dev
```

## Usage

Add to eslint.config.mjs

```js
// example: eslint.config.mjs
export { default } from '@nice-move/eslint-config-react';
```

Then run

```bash
eslint --fix .
```

## Specification

| Environment | pattern                                |
| :---------- | :------------------------------------- |
| browser     | `.js`, `.html`, `.jsx`                 |
| node.js     | `.mjs`, `.mts`, `.cjs`, `.cts`         |
| es modules  | `.mjs`, `.mts`, `.js`, `.html`, `.jsx` |
| commonjs    | `.cjs`, source code in webpack project |

## Tips

### Noiseless reporting

Rules can handle by [prettier](https://prettier.io/) and [garou](https://github.com/nice-move/garou) is disabled by default.

## Related

- [@nice-move/eslint-config-base](../eslint-config-base/)
- [@nice-move/eslint-config-vue](../eslint-config-vue/)
