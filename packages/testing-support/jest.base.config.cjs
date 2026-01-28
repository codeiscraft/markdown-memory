module.exports = {
  clearMocks: true,
  collectCoverageFrom: ['src/**/*.(js|jsx|ts|tsx)'],
  coveragePathIgnorePatterns: ['/index\\.(ts|js)$', '/testing-support'],
  moduleNameMapper: {
    '^@mdm/cache$': require.resolve('@mdm/cache/mocks'),
    '^@mdm/components$': require.resolve('@mdm/components/mocks'),
    '^@mdm/server-connect$': require.resolve('@mdm/server-connect/mocks'),
    '^@mdm/sync-bear/backend$': require.resolve('@mdm/sync-bear/mocks'),
    '^@mdm/sync-bear/components$': require.resolve('@mdm/sync-bear/mocks'),
    '^@mdm/sync-bear/constants$': require.resolve('@mdm/sync-bear/mocks'),
    '^@mdm/sync-bear$': require.resolve('@mdm/sync-bear/mocks'),
    '^@mdm/utils/fs$': require.resolve('@mdm/utils/mocks'),
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
