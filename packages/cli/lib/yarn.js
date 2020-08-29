module.exports = {
  quiet: true,
  files: 'yarn.lock',
  from: /\?cache=.*#/,
  to: '#',
};
