'use strict';

module.exports = {
  hooks: {
    updateConfig(config) {
      return Object.assign(config, {
        verifyDepsBeforeRun: 'warn',
        shamefullyHoist: true,
        ignorePatchFailures: false,
        engineStrict: true,
        minimumReleaseAge: 1440,
      });
    },
  },
};
