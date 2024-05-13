import { createRequire } from 'node:module';

import { getPkg, haveDevDependencies } from 'settingz';

// eslint-disable-next-line consistent-return
export function configHas(checker, getResult) {
  const pkg = getPkg('nice-move');

  const io = checker(pkg);

  if (io) {
    return getResult(io, pkg);
  }
}

export const require = createRequire(import.meta.url);

export function loadPlugin(name) {
  try {
    return haveDevDependencies(name) ? require.resolve(name) : false;
  } catch {
    return false;
  }
}
