# @nice-move/syncpack-config <img src="https://jamiemason.github.io/syncpack/logo.svg" alt="logo" height="80" align="right">

A [syncpack] config created by personal preferences.

[![npm][npm-badge]][npm-url]
[![github][github-badge]][github-url]
![node][node-badge]

[syncpack]: https://jamiemason.github.io/
[npm-url]: https://www.npmjs.com/package/@nice-move/syncpack-config
[npm-badge]: https://img.shields.io/npm/v/@nice-move/syncpack-config.svg?style=flat-square&logo=npm
[github-url]: https://github.com/nice-move/nice-move/tree/master/packages/syncpack-config
[github-badge]: https://img.shields.io/npm/l/@nice-move/syncpack-config.svg?style=flat-square&colorB=blue&logo=github
[node-badge]: https://img.shields.io/node/v/@nice-move/syncpack-config.svg?style=flat-square&colorB=green&logo=node.js

## Installation

```bash
npm install @nice-move/syncpack-config --save-dev
```

## Usage

```mjs
// example: syncpack.config.mjs
// @ts-check
import defineConfig from '@nice-move/syncpack-config';

export default defineConfig(import.meta.url, {
  versionGroups: [
    {
      dependencies: ['@example/*'],
      dependencyTypes: ['!local'],
      label: 'Pin pnpm workspace',
      pinVersion: 'workspace:~'
    }
  ]
});
```
