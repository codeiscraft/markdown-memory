export default {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.(js|jsx|ts|tsx)'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['@mdm/testing-support/setupTests.ts'],
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(js|jsx|ts|tsx)',
    '<rootDir>/src/**/?(*.)(test|spec).(js|jsx|ts|tsx)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
}
