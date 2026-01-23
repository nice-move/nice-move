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
        engineStrict: true,
        ignorePatchFailures: false,
        minimumReleaseAge: 1440,
        optimisticRepeatInstall: true,
        shamefullyHoist: true,
        strictDepBuilds: false,
        trustPolicy: 'no-downgrade',
        verifyDepsBeforeRun: 'warn',
        strictPeerDependencies: true,
        trustPolicyExclude: ['semver', 'memfs@4.56.2'],
        minimumReleaseAgeExclude: [
          '@all-star/*',
          '@best-shot/*',
          '@into-mini/*',
          '@nice-move/*',
        ],
        allowBuilds: {
          '@parcel/watcher': false,
          'core-js': false,
          'core-js-pure': false,
          esbuild: false,
          less: false,
          ssh2: false,
          'vue-demi': false,
          'cpu-features': false,
        },
        updateConfig: {
          ignoreDependencies: [
            'tailwindcss',
            'stylelint',
            'react',
            'react-dom',
            'react-router',
          ],
        },
      });
    },
  },
};
