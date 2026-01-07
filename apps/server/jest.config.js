const baseConfig = require('@mdm/testing-support/baseConfig')

module.exports = {
  ...baseConfig,
  coveragePathIgnorePatterns: [
    'src/server.ts', // entirely glue
    'src/start.ts', // entirely glue
    'route.ts', // ignore route definitions for all endpoints
    '/testing-support',
  ],
}
