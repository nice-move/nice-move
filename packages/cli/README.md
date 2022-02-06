# @nice-move/cli

Frontend develop helper for frontend development.

[![npm][npm-badge]][npm-url]
[![github][github-badge]][github-url]
![node][node-badge]

[npm-url]: https://www.npmjs.com/package/@nice-move/cli
[npm-badge]: https://img.shields.io/npm/v/@nice-move/cli.svg?style=flat-square&logo=npm
[github-url]: https://github.com/nice-move/nice-move/tree/master/packages/cli
[github-badge]: https://img.shields.io/npm/l/@nice-move/cli.svg?style=flat-square&colorB=blue&logo=github
[node-badge]: https://img.shields.io/node/v/@nice-move/cli.svg?style=flat-square&colorB=green&logo=node.js

## Installation

```bash
npm install @nice-move/cli --save-dev
```

## Usage

```bash
npm exec nice-move <command>
```

## Commands

### `lint commit`

Lint git commit message.

Use [commitlint](https://commitlint.js.org/) to enforcing [conventional commits](https://conventionalcommits.org/).

```sh
#!/bin/sh

# file: .git/hooks/commit-msg

npm exec nice-move lint commit
```

### `lint staged`

Lint and format git staged files.

Install `eslint` / `stylelint` / `prettier` / `garou` when needed:

```bash
npm install eslint stylelint prettier garou --save-dev
```

Add configurations:

```jsonc
// file: package.json
{
  "eslintConfig": {},
  "prettier": {},
  "stylelint": {},
  "garou": {}
}
```

```sh
#!/bin/sh

# file: .git/hooks/pre-commit

npm exec nice-move lint staged
```

Change a few files, then run:

```bash
git add .
npm exec nice-move lint staged
```

## Related

- [@nice-move/init](../init)
- [@nice-move/commitlint-config](../commitlint-config)
- [@nice-move/eslint-config-base](../eslint-config-base)
- [@nice-move/eslint-config-react](../eslint-config-react)
- [@nice-move/eslint-config-vue](../eslint-config-vue)
- [@nice-move/stylelint-config](../stylelint-config)
- [@nice-move/prettier-config](../prettier-config)
