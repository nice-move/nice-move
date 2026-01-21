'use strict';
// @ts-check

/* eslint-disable no-param-reassign */

module.exports = {
  /**
   * @type {import('@pnpm/pnpmfile').Hooks}
   */
  hooks: {
    updateConfig(/** @type {import('@pnpm/types').PnpmSettings} */ config) {
      Object.assign(config, {
        blockExoticSubdeps: true,
        engineStrict: true,
        ignorePatchFailures: false,
        minimumReleaseAge: 1440,
        optimisticRepeatInstall: true,
        shamefullyHoist: true,
        strictDepBuilds: false,
        strictPeerDependencies: true,
        trustPolicy: 'no-downgrade',
        verifyDepsBeforeRun: 'warn',
      });

      config.allowBuilds ??= {};

      config.allowBuilds['@parcel/watcher'] ??= false;
      config.allowBuilds['core-js'] ??= false;
      config.allowBuilds['core-js-pure'] ??= false;
      config.allowBuilds.esbuild ??= false;
      config.allowBuilds.less ??= false;

      return config;
    },
  },
};
