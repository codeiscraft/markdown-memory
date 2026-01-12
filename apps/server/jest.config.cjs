const baseConfig = require('@mdm/testing-support/baseConfig')

module.exports = {
  ...baseConfig,
  coveragePathIgnorePatterns: [
    'src/server.ts', // entirely glue
    'src/start.ts', // entirely glue
    'src/identity/util.ts', // only contains identity util functions
    'route.ts', // ignore route definitions for all endpoints
    '/testing-support',
  ],
}
