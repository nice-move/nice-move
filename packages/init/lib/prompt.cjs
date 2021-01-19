const prompts = require('prompts');

module.exports = function prompt({ message, choices, callback }) {
  prompts({
    type: 'multiselect',
    name: 'actions',
    message,
    format: (actions) =>
      Object.fromEntries(actions.map((item) => [item, true])),
    choices,
  })
    .then(({ actions = {} }) => {
      callback(actions);
    })
    .catch(console.error);
};
