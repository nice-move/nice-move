import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import globals from 'globals';
import { getPkg } from 'settingz';

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
    const url = import.meta.resolve('@nice-move/config/package.json');
    const config = JSON.parse(readFileSync(fileURLToPath(url), 'utf8'));

    return config[name];
  } catch {
    return null;
  }
}

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
      ...globals.es2026,
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
