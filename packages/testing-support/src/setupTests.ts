import '@testing-library/jest-dom'
import { webcrypto } from 'node:crypto'
import { TextDecoder, TextEncoder } from 'node:util'

if (typeof globalThis.structuredClone === 'undefined') {
  globalThis.structuredClone = (obj: unknown) => obj && JSON.parse(JSON.stringify(obj))
}

if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = class ResizeObserver {
    disconnect() {}
    observe() {}
    unobserve() {}
  }
}

if (typeof globalThis.TextEncoder === 'undefined') {
  globalThis.TextEncoder = TextEncoder
}

if (typeof globalThis.TextDecoder === 'undefined') {
  globalThis.TextDecoder = TextDecoder
}

if (typeof globalThis.crypto === 'undefined') {
  Object.defineProperty(globalThis, 'crypto', {
    configurable: true,
    value: webcrypto,
  })
} else {
  if (!globalThis.crypto.subtle) {
    Object.defineProperty(globalThis.crypto, 'subtle', {
      configurable: true,
      value: webcrypto.subtle,
    })
  }
  if (!globalThis.crypto.getRandomValues) {
    Object.defineProperty(globalThis.crypto, 'getRandomValues', {
      configurable: true,
      value: webcrypto.getRandomValues.bind(webcrypto),
    })
  }
}
