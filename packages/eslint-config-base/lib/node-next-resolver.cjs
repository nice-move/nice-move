'use strict';

const path = require('node:path');
const { resolve: resolveExports } = require('resolve.exports');
const { builtinModules } = require('node:module');

const withNodeLabel = builtinModules.map((item) => `node:${item}`);

const builtins = new Set([...builtinModules, ...withNodeLabel]);

module.exports = {
  interfaceVersion: 2,
  resolve: (source, file) => {
    if (/\.[cm][jt]s$/.test(file) && builtins.has(source)) {
      return { found: true, path: null };
    }

    try {
      const moduleId = require.resolve(source, { paths: [path.dirname(file)] });

      if (builtins.has(moduleId)) {
        return { found: false };
      }

      return { found: true, path: moduleId };
    } catch (error) {
      if (
        error.code === 'MODULE_NOT_FOUND' &&
        error.path?.endsWith('/package.json')
      ) {
        const { name, module, main, exports } = require(error.path);

        const resolved = resolveExports(
          { name, module, main, exports },
          source,
        );
        const moduleId = path.join(path.dirname(error.path), resolved);

        return { found: true, path: moduleId };
      }

      return { found: false };
    }
  },
};
