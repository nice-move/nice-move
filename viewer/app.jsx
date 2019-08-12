import React, { PureComponent } from 'react';
import DiffViewer from 'react-diff-viewer';

import base from '../rules/eslint-config-base.json';
import vue from '../rules/eslint-config-vue.json';
import react from '../rules/eslint-config-react.json';

const list = {
  base,
  vue,
  react
};

export default class App extends PureComponent {
  state = {
    rules: list,
    left: Object.keys(list)[0],
    right: Object.keys(list)[1]
  };

  render() {
    const { rules, left, right } = this.state;
    return (
      <DiffViewer
        extraLinesSurroundingDiff={1}
        newValue={rules[right]}
        oldValue={rules[left]}
        splitView
      />
    );
  }
}
