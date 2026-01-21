const baseConfig = require('@mdm/testing-support/baseConfig')

module.exports = {
  ...baseConfig,
  coveragePathIgnorePatterns: ['src/backend.ts', 'src/components.ts'],
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
}
