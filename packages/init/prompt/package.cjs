const validate = require('validate-npm-package-name');
const semverRegex = require('semver-regex');
const username = require('git-username');
const { sep } = require('path');

const semver = semverRegex();

function trim(value) {
  return value ? value.trim() : undefined;
}

exports.prompt = ({
  cwd,
  pkg: { name, version, description, license, private: isPrivate, author } = {},
}) => [
  {
    format: trim,
    initial: cwd.split(sep).slice(-1)[0].trim(),
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
    type: (first) => (first === false || license ? null : 'toggle'),
    name: 'license',
    message: 'package.json » license',
    initial: false,
    inactive: 'MIT',
    active: 'UNLICENSE',
    format: (value) => (value ? 'UNLICENSE' : 'MIT'),
  },
  {
    format: trim,
    type: (first) =>
      first === false ||
      (typeof author === 'string' ? author : author && author.name)
        ? null
        : 'text',
    name: 'author',
    message: 'package.json » author',
    initial: username(),
  },
  {
    initial: true,
    message: 'package.json » private',
    name: 'private',
    type: (first) =>
      first === false || isPrivate !== undefined ? null : 'confirm',
  },
];
