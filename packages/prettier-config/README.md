# @nice-move/prettier-config [<img src="https://raw.githubusercontent.com/prettier/prettier-logo/master/images/prettier-icon-light.png" alt="prettier" height="80" align="right">][prettier]

A [prettier] config created by personal preferences.

[![npm][npm-badge]][npm-url]
[![github][github-badge]][github-url]
![node][node-badge]

[prettier]: https://prettier.io/
[npm-url]: https://www.npmjs.com/package/@nice-move/prettier-config
[npm-badge]: https://img.shields.io/npm/v/@nice-move/prettier-config.svg?style=flat-square&logo=npm
[github-url]: https://github.com/nice-move/nice-move/tree/master/packages/prettier-config
[github-badge]: https://img.shields.io/npm/l/@nice-move/prettier-config.svg?style=flat-square&colorB=blue&logo=github
[node-badge]: https://img.shields.io/node/v/@nice-move/prettier-config.svg?style=flat-square&colorB=green&logo=node.js

## Extname support

- .gql .md
- .editorconfig
- .css .less .scss
- .cjs .mjs .js .jsx
- .htm .html .xml .svg .vue
- .yml .yaml .toml .ini .json

## Filename support

- .npmrc
- .babelrc
- .ssh/config ssh_config

### Mini progarm

- .acss
- .jxss
- .ttss
- .qss .qs
- .wxss .wxs

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
prettier --write .
```

## Tips

This config including special plugins:

- [@nice-move/prettier-plugin-package-json](https://github.com/nice-move/prettier-plugin-package-json)
- [prettier-plugin-ssh-config](https://github.com/nice-move/prettier-plugin-ssh-config)

### Editorconfig support

Create: .editorconfig

```ini
[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
max_line_length = 80
quote_type = single
tab_width = 2
trim_trailing_whitespace = true
```

## Related

- [garou](https://github.com/nice-move/garou)
