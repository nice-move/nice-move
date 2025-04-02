import { createRequire } from 'node:module';

import globals from 'globals';
import { getPkg } from 'settingz';

export const require = createRequire(import.meta.url);

export function pkgHas(checker, getResult) {
  const pkg = getPkg();

  const io = checker(pkg);

  if (io) {
    return getResult(io, pkg) || [];
  }

  return [];
}

function getConfig(name) {
  try {
    // eslint-disable-next-line import/no-unresolved
    return require('@nice-move/config/package.json')[name];
  } catch {
    return null;
  }
}

// eslint-disable-next-line consistent-return
export function configHas(checker, getResult) {
  const pkg = getConfig('nice-move') || getPkg('nice-move');

  const io = checker(pkg);

  if (io) {
    return getResult(io, pkg);
  }
}

export function getGlobals(env = {}) {
  return Object.fromEntries([
    ...Object.keys({
      ...globals.browser,
      ...globals.node,
      ...globals.es2025,
    }).map((key) => [key, 'off']),
    ...Object.entries(env).flatMap(([key, on]) =>
      on
        ? Object.entries(globals[key] || {}).map(([k, v]) => [
            k,
            v ? 'writable' : 'readonly',
          ])
        : Object.keys(globals[key] || {}).map((k) => [k, 'off']),
    ),
  ]);
}
