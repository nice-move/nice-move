import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { haveDevDependencies } from 'settingz';

export function loadPlugin(name) {
  try {
    return haveDevDependencies(name)
      ? fileURLToPath(import.meta.resolve(name))
      : false;
  } catch {
    return false;
  }
}

export function loadOrderPreset() {
  try {
    const url = import.meta.resolve('@nice-move/config/package.json');
    const {
      'nice-move': {
        'import-groups': config = [],
        'internal-regex': internalRegex,
      } = {},
    } = JSON.parse(readFileSync(fileURLToPath(url), 'utf8'));

    return [...config, internalRegex].map((item) => item || '');
  } catch {
    return [];
  }
}
