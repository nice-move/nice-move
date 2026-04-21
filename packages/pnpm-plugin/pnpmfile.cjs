'use strict';

// @ts-check

const isObject = (v) =>
  v !== null && typeof v === 'object' && !Array.isArray(v);

function deepMerge(target = {}, source = {}) {
  return Object.entries(source).reduce(
    (out, [key, srcVal]) => {
      if (srcVal === undefined) {
        return out;
      }

      const tgtVal = out[key];

      if (tgtVal === undefined) {
        out[key] = srcVal;

        return out;
      }

      if (Array.isArray(srcVal) && Array.isArray(tgtVal)) {
        const seen = new Set(tgtVal);
        out[key] = [...tgtVal, ...srcVal.filter((i) => !seen.has(i))];

        return out;
      }

      if (isObject(srcVal) && isObject(tgtVal)) {
        out[key] = deepMerge(tgtVal, srcVal);
      }

      return out;
    },
    { ...target },
  );
}

module.exports = {
  /**
   * @type {import('@pnpm/pnpmfile').Hooks}
   */
  hooks: {
    updateConfig(/** @type {import('@pnpm/config').Config} */ config) {
      return deepMerge(config, {
        blockExoticSubdeps: true,
        disallowWorkspaceCycles: true,
        engineStrict: true,
        ignorePatchFailures: false,
        ignoreWorkspaceCycles: false,
        minimumReleaseAge: 2880,
        optimisticRepeatInstall: true,
        shamefullyHoist: true,
        strictDepBuilds: false,
        strictPeerDependencies: true,
        trustPolicy: 'no-downgrade',
        verifyDepsBeforeRun: 'warn',
        trustPolicyExclude: ['memfs@4.56.2', 'chokidar@4.0.3'],
        minimumReleaseAgeExclude: [
          '@all-star/*',
          '@best-shot/*',
          '@into-mini/*',
          '@nice-move/*',
          'garou',
        ],
        allowBuilds: {
          '@parcel/watcher': false,
          'core-js-pure': false,
          'core-js': false,
          'cpu-features': false,
          'unrs-resolver': false,
          'vue-demi': false,
          'weapp-tailwindcss': true,
          esbuild: false,
          less: false,
          ssh2: false,
        },
        updateConfig: {
          ignoreDependencies: [
            '@antv/f2',
            'eslint',
            'react-dom',
            'react',
            'string-width',
            'tailwindcss',
            'unplugin-vue-components',
          ],
        },
      });
    },
  },
};
