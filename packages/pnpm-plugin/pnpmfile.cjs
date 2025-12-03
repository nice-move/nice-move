'use strict';

module.exports = {
  hooks: {
    updateConfig(config) {
      return Object.assign(config, {
        engineStrict: true,
        ignorePatchFailures: false,
        minimumReleaseAge: 1440,
        shamefullyHoist: true,
        strictDepBuilds: true,
        verifyDepsBeforeRun: 'warn',
      });
    },
  },
};
