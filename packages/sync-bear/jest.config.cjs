const baseConfig = require('@mdm/testing-support/baseConfig')

module.exports = {
  ...baseConfig,
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
}
