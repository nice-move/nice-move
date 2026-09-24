// @ts-check

/**
 * @param {unknown} v
 * @returns {v is Record<string, unknown>}
 */
const isObject = (v) =>
  v !== null && typeof v === 'object' && !Array.isArray(v);

/**
 * @param {Record<string, unknown>} [target={}]
 * @param {Record<string, unknown>} [source={}]
 * @returns {Record<string, unknown>}
 */
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

export default {
  hooks: {
    updateConfig(/** @type {import('@pnpm/config').Config} */ config) {
      return /** @type {never} */ (
        deepMerge(
          /** @type {Record<string, unknown>} */ (
            /** @type {unknown} */ (config)
          ),
          {
            autoDedupe: true,
            trustPolicyExcludePrune: true,
            minimumReleaseAgeExcludePrune: true,
            blockExoticSubdeps: true,
            disallowWorkspaceCycles: true,
            engineStrict: true,
            ignorePatchFailures: false,
            ignoreWorkspaceCycles: false,
            minimumReleaseAge: 2880,
            optimisticRepeatInstall: true,
            shamefullyHoist: true,
            strictDepBuilds: false,
            dedupeDirectDeps: true,
            strictPeerDependencies: true,
            trustPolicy: 'no-downgrade',
            verifyDepsBeforeRun: 'warn',
            packageManagerStrictVersion: true,
            trustPolicyExclude: [
              'memfs@4.56.2',
              'semver@6.3.1',
              'chokidar@4.0.3',
              '@vercel/detect-agent@1.2.5',
            ],
            managePackageManagerVersions: false,
            minimumReleaseAgeExclude: [
              '@all-star/*',
              '@best-shot/*',
              '@into-mini/*',
              '@nice-move/*',
              '@bring-it/*',
              'garou',
            ],
            allowBuilds: {
              '@parcel/watcher': false,
              '@swc/core': false,
              'core-js-pure': false,
              'core-js': false,
              'cpu-features': false,
              'unrs-resolver': false,
              'vue-demi': false,
              'weapp-tailwindcss': true,
              esbuild: false,
              less: false,
              sharp: false,
              ssh2: false,
            },
            updateConfig: {
              ignoreDependencies: [
                'react-dom',
                'react',
                'string-width',
                'tailwindcss',
                'unplugin-vue-components',
              ],
            },
          },
        )
      );
    },
  },
};
