module.exports = {
  collectCoverage: true,
  projects: [
    '<rootDir>/packages/cache/jest.config.cjs',
    '<rootDir>/packages/components/jest.config.js',
    '<rootDir>/packages/notes/jest.config.js',
    '<rootDir>/packages/profile/jest.config.cjs',
    '<rootDir>/packages/serverStatus/jest.config.cjs',
    '<rootDir>/packages/testing-support/jest.base.config.cjs',
    '<rootDir>/packages/utils/jest.config.cjs',
    '<rootDir>/apps/server/jest.config.cjs',
    '<rootDir>/apps/web/jest.config.js',
  ],
}
