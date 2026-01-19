const baseConfig = require('@mdm/testing-support/baseConfig')

module.exports = {
  ...baseConfig,
  coveragePathIgnorePatterns: [
    'src/index.ts',
    'src/ui/', // this code is copy/paste from Chakra UI
    'src/mocks.cjs', // mocks file
  ],
}
