const prompts = require('prompts');

module.exports = {
  Checkbox({ message, choices, callback }) {
    return prompts({
      instructions: false,
      message,
      name: 'actions',
      type: 'multiselect',
      format: (actions) =>
        Object.fromEntries(actions.map((item) => [item, true])),
      choices,
      // eslint-disable-next-line consistent-return
    }).then(({ actions }) => {
      if (actions !== undefined) {
        return callback(actions);
      }
    });
  },
  Confirm({ message, callback }) {
    return prompts({
      instructions: false,
      message,
      name: 'okay',
      type: 'toggle',
      active: 'do it',
      inactive: 'cancel',
      // eslint-disable-next-line consistent-return
    }).then(({ okay }) => {
      if (okay) {
        return callback();
      }
    });
  },
};
