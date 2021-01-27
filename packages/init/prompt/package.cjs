const validate = require('validate-npm-package-name');
const semverRegex = require('semver-regex');
const parse = require('parse-author');

const { getAuthor, trim, dirname } = require('../lib/utils.cjs');

const semver = semverRegex();

exports.prompt = ({
  cwd,
  pkg: {
    author,
    description,
    license,
    name,
    private: isPrivate,
    version,
    workspaces,
  } = {},
}) => [
  {
    format: trim,
    initial: dirname(cwd),
    message: 'package.json » name',
    name: 'name',
    type: (first) => (first === false || name ? null : 'text'),
    validate: (value) => validate(trim(value) || '').validForNewPackages,
  },
  {
    format: trim,
    initial: '0.0.0',
    message: 'package.json » version',
    name: 'version',
    type: (first) => (first === false || version ? null : 'text'),
    validate: (value) => semver.test(trim(value) || ''),
  },
  {
    format: trim,
    message: 'package.json » description',
    name: 'description',
    type: (first) => (first === false || description ? null : 'text'),
  },
  {
    active: 'MIT',
    format: (value) => (value ? 'MIT' : 'UNLICENSE'),
    inactive: 'UNLICENSE',
    initial: true,
    message: 'package.json » license',
    name: 'license',
    type: (first) => (first === false || license ? null : 'toggle'),
  },
  {
    type: (first) =>
      first === false ||
      (typeof author === 'string' ? author : author && author.name)
        ? null
        : 'text',
    format: parse,
    initial: getAuthor(author),
    message: 'package.json » author',
    name: 'author',
  },
  {
    active: 'true',
    inactive: 'false',
    initial: true,
    message: 'package.json » private',
    name: 'private',
    format: (value) => (value === false ? undefined : value),
    type: (first) =>
      first === false || isPrivate !== undefined ? null : 'toggle',
  },
  {
    active: 'recommend',
    inactive: 'false',
    initial: false,
    message: 'package.json » workspaces',
    name: 'workspaces',
    format: (value) => (value ? ['packages/*', 'tools/*'] : undefined),
    type: (first, feedback) =>
      first === false ||
      (workspaces && workspaces.length > 0) ||
      isPrivate === false ||
      feedback.private === false
        ? null
        : 'toggle',
  },
];
