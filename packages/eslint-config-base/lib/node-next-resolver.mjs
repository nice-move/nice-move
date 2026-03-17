import { fileURLToPath } from 'node:url';

import path from 'node:path';
import { resolve as resolveExports } from 'resolve.exports';
import { builtinModules } from 'node:module';
import { readFileSync } from 'node:fs';

const withNodeLabel = builtinModules.map((item) => `node:${item}`);

const builtins = new Set([...builtinModules, ...withNodeLabel]);

function isValidUrl(string) {
  try {
    const io = new URL(string);

    return ['http:', 'https:'].includes(io.protocol);
  } catch {
    return false;
  }
}

export const interfaceVersion = 2;

export const resolve = (source, file, config) => {
  if (config.importHttp && isValidUrl(source)) {
    return { found: true, path: null };
  }

  if (/\.[cm][jt]s$/.test(file) && builtins.has(source)) {
    return { found: true, path: null };
  }

  try {
    const moduleId = fileURLToPath(
      import.meta.resolve(source, { paths: [path.dirname(file)] }),
    );

    if (builtins.has(moduleId)) {
      return { found: false };
    }

    return { found: true, path: moduleId };
  } catch (error) {
    if (
      error.code === 'MODULE_NOT_FOUND' &&
      error.path?.endsWith('/package.json')
    ) {
      const { name, module, main, exports, imports } = JSON.parse(
        readFileSync(error.path),
      );

      const [resolved] = resolveExports(
        { name, module, main, exports, imports },
        source,
      );
      const moduleId = path.join(path.dirname(error.path), resolved);

      return { found: true, path: moduleId };
    }

    return { found: false };
  }
};
