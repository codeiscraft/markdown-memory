import '@testing-library/jest-dom'

if (typeof globalThis.structuredClone === 'undefined') {
  globalThis.structuredClone = (obj: unknown) => obj && JSON.parse(JSON.stringify(obj))
}
