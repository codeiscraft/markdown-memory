module.exports = {
  directoryFileCount: jest.fn(),
  fetchLocal: jest.fn(),
  fetchTyped: jest.fn(),
  fileStats: jest.fn(),
  generateEncryptionProfile: jest.fn(),
  generateUserSalt: jest.fn(),
  isDirectoryWithReadAccess: jest.fn(),
  joinPath: jest.fn().mockImplementation((...parts) => parts.join('/')),
  resolveHomeDir: jest.fn(),
  toSlug: jest.fn(),
}
