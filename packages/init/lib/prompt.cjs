const prompts = require('prompts');

module.exports = function prompt({ message, choices, callback }) {
  return prompts({
    instructions: false,
    message,
    name: 'actions',
    type: 'multiselect',
    format: (actions) =>
      Object.fromEntries(actions.map((item) => [item, true])),
    choices,
  }).then(({ actions }) => {
    if (actions) {
      callback(actions);
    }
  });
};
