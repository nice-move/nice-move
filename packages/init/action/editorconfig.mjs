import { Text } from 'fs-chain';

import { cyan } from '../lib/color.mts';
import editorconfig from '../template/.editorconfig.txt';

export function EditorConfig() {
  return new Text()
    .onDone(() => editorconfig)
    .output('.editorconfig')
    .logger('Create/Overwrite', cyan('.editorconfig'))
    .catch(console.warn);
}
