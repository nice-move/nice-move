import { Text } from 'fs-chain';

import { cyan } from '../lib/color.mjs';

export function EditorConfig() {
  return new Text()
    .source('../../template/.editorconfig.tpl', import.meta.url)
    .output('.editorconfig')
    .logger('Create/Overwrite', cyan('.editorconfig'))
    .catch(console.warn);
}
