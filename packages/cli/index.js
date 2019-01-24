#!/usr/bin/env node

const { ini } = require('mrm-core');

function editorconfig() {
  const filePath = require.resolve('./template/editorconfig.ini');

  const template = ini(filePath);

  ini('.editorconfig', 'Generate by nice-move\n')
    .unset()
    .set('_global', { root: true })
    .set('*', template.get('_global'))
    .save();
}

editorconfig();
