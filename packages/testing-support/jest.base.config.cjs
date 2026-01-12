module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.(js|jsx|ts|tsx)'],
  coveragePathIgnorePatterns: ['/index\\.(ts|js)$', '/testing-support'],
  moduleNameMapper: {
    '^@mdm/cache$': require.resolve('@mdm/cache/mocks'),
    '^@mdm/utils$': require.resolve('@mdm/utils/mocks'),
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['@mdm/testing-support/setupTests.ts'],
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(js|jsx|ts|tsx)',
    '<rootDir>/src/**/?(*.)(test|spec).(js|jsx|ts|tsx)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }],
  },
}
