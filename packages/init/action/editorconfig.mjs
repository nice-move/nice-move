import { cyan } from 'chalk';
import { Text } from 'fs-chain';

export function EditorConfig() {
  return new Text()
    .source('../../template/.editorconfig.tpl', import.meta.url)
    .output('.editorconfig')
    .logger('Create/Overwrite', cyan('.editorconfig'))
    .catch(console.warn);
}
