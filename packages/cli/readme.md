# @nice-move/cli

## Installation

```bash
yarn add @nice-move/cli -D
```

## Usage

```bash
yarn add eslint stylelint prettier -D
```

```json
// example: package.json
{
  "script": {
    "format": "nice-move"
  },
  "eslintConfig": {
    "extends": "@nice-move/eslint-config-base"
  },
  "prettier": "@nice-move/prettier-config",
  "stylelint": {
    "extends": "@nice-move/stylelint-config"
  }
}
```

```bash
git add .
yarn run format
```

## Use with `husky`

```bash
yarn add husky -D
```

```json
// example: package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "nice-move"
    }
  }
}
```

```bash
git add .
git commit -m "example"
```
