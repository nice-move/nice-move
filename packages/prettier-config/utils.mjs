import { createRequire } from 'node:module';

import { haveDevDependencies } from 'settingz';

export const require = createRequire(import.meta.url);

export function loadPlugin(name) {
  try {
    return haveDevDependencies(name) ? require.resolve(name) : false;
  } catch {
    return false;
  }
}

export function loadOrderPreset() {
  try {
    const {
      'nice-move': {
        'import-groups': config = [],
        'internal-regex': internalRegex,
      } = {},
      // eslint-disable-next-line import/no-unresolved
    } = require('@nice-move/config/package.json');

    return [...config, internalRegex].map((item) => item || '');
  } catch {
    return [];
  }
}
