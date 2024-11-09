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
- .yml .yaml .ini .json
- .htm .html .xml .svg .vue

## Filename support

- .npmrc
- .babelrc
- .sentryclirc
- .ssh/config ssh_config

### Mini progarm

- .acss
- .jxss
- .ttss
- .qss .qs
- .wxss .wxs

### Include plugins

- [@nice-move/prettier-plugin-package-json](https://github.com/nice-move/prettier-plugin-package-json)
- prettier-plugin-ini
- @prettier/plugin-xml
- prettier-plugin-css-order
- @nice-move/prettier-plugin-sort-imports

### Auto load plugins when they are installed

- [prettier-plugin-ssh-config]
- [prettier-plugin-groovy]
- prettier-plugin-java
- prettier-plugin-nginx
- prettier-plugin-tailwindcss
- @cospaia/prettier-plugin-clojure

### Addons support from kroki

- .bpmn
- .bytefield
- .excalidraw
- .markmap
- .vega
- .vegalite
- .wavedrom
- .wireviz

## Installation

```bash
npm install prettier @nice-move/prettier-config --save-dev
```

## Usage

Add to package.json

```jsonc
// example: package.json
{
  "prettier": "@nice-move/prettier-config"
}
```

Then run

```bash
prettier --write .
```

### Editorconfig support

```ini
# .editorconfig

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
- [prettier-plugin-dbml](https://github.com/nice-move/prettier-plugin-dbml)
- [prettier-plugin-groovy]
- [prettier-plugin-ssh-config]

[prettier-plugin-ssh-config]: https://github.com/nice-move/prettier-plugin-ssh-config
[prettier-plugin-groovy]: https://github.com/nice-move/prettier-plugin-groovy
