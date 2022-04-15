# @nice-move/eslint-config-vue [<img src="https://cdn.worldvectorlogo.com/logos/eslint-1.svg" alt="eslint" height="80" align="right">][eslint]

A [eslint] config for [vue] project best practice.

[![npm][npm-badge]][npm-url]
[![github][github-badge]][github-url]
![node][node-badge]

[vue]: https://vuejs.org/
[eslint]: https://eslint.org/
[npm-url]: https://www.npmjs.com/package/@nice-move/eslint-config-vue
[npm-badge]: https://img.shields.io/npm/v/@nice-move/eslint-config-vue.svg?style=flat-square&logo=npm
[github-url]: https://github.com/nice-move/nice-move/tree/master/packages/eslint-config-vue
[github-badge]: https://img.shields.io/npm/l/@nice-move/eslint-config-vue.svg?style=flat-square&colorB=blue&logo=github
[node-badge]: https://img.shields.io/node/v/@nice-move/eslint-config-vue.svg?style=flat-square&colorB=green&logo=node.js

## Installation

```bash
npm install eslint @nice-move/eslint-config-vue --save-dev
```

## Usage

Add to package.json

```jsonc
// example: package.json
{
  "eslintConfig": {
    "extends": "@nice-move/eslint-config-vue"
  }
}
```

Then run

```bash
eslint --fix .
```

## Specification

[ava]: https://github.com/avajs/ava
[webpack]: https://webpack.js.org/

| Environment | pattern                                                                                      |
| :---------- | :------------------------------------------------------------------------------------------- |
| browser     | `.js`, `.html`, `.vue`                                                                       |
| node.js     | `.mjs`, `.mts`, `.cjs`, `.cts`                                                               |
| es modules  | `.mjs`, `.mts`, `.js`, `.html`, `.vue`                                                       |
| commonjs    | `.cjs`, source code in webpack project                                                       |
| [webpack]   | `src/**`, `packages/*/**`                                                                    |
| [ava]       | `{test,tests,spec,specs}/**`, `**/*.{test,spec}.*` <br /> when `eslint-plugin-ava` installed |

## Tips

### Noiseless reporting

Rules can handle by [prettier](https://prettier.io/) and [garou](https://github.com/nice-move/garou) is disabled by default.

### TODO

- [ ] JSX for `vue`
- [ ] typescript in `vue` SFC

## Related

- [@nice-move/eslint-config-base](../eslint-config-base/)
- [@nice-move/eslint-config-react](../eslint-config-react/)
