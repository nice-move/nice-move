'use strict';

// @ts-check

const minimumReleaseAgeExclude = [
  '@nice-move/*',
  '@best-shot/*',
  '@all-star/*',
];

const trustPolicyExclude = ['semver', 'memfs@4.56.2'];

/* eslint-disable no-param-reassign */

module.exports = {
  /**
   * @type {import('@pnpm/pnpmfile').Hooks}
   */
  hooks: {
    updateConfig(/** @type {import('@pnpm/config').Config} */ config) {
      Object.assign(config, {
        blockExoticSubdeps: true,
        engineStrict: true,
        ignorePatchFailures: false,
        minimumReleaseAge: 1440,
        optimisticRepeatInstall: true,
        shamefullyHoist: true,
        strictDepBuilds: false,
        trustPolicy: 'no-downgrade',
        verifyDepsBeforeRun: 'warn',
      });

      config.strictPeerDependencies ??= true;

      config.allowBuilds ??= {};

      config.allowBuilds['@parcel/watcher'] ??= false;
      config.allowBuilds['core-js'] ??= false;
      config.allowBuilds['core-js-pure'] ??= false;
      config.allowBuilds.esbuild ??= false;
      config.allowBuilds.less ??= false;

      config.minimumReleaseAgeExclude ??= [];

      for (const item of minimumReleaseAgeExclude) {
        if (!config.minimumReleaseAgeExclude.includes(item)) {
          config.minimumReleaseAgeExclude.push(item);
        }
      }

      config.trustPolicyExclude ??= [];

      for (const item of trustPolicyExclude) {
        if (!config.trustPolicyExclude.includes(item)) {
          config.trustPolicyExclude.push(item);
        }
      }

      return config;
    },
  },
};
