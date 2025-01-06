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

// eslint-disable-next-line consistent-return
export function configHas(checker, getResult) {
  const pkg = getPkg('nice-move');

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
