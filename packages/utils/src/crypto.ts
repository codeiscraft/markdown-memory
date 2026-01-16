import { EncryptionProfile } from './crypto.types'

const kdf = 'PBKDF2-SHA256'
const v = 1
const VERIFICATION_PLAINTEXT = 'markdown-memory:passphrase-check'
const PBKDF2_ITERATIONS = 250_000

const verificationAlg = 'AES-GCM'

export async function deriveMasterKey(
  passphrase: string,
  saltBytes: Uint8Array,
  iterations = PBKDF2_ITERATIONS,
) {
  const encoder = new TextEncoder()
  const salt = toArrayBuffer(saltBytes)

  const baseKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(passphrase),
    'PBKDF2',
    false,
    ['deriveKey'],
  )

  return crypto.subtle.deriveKey(
    {
      hash: 'SHA-256',
      iterations,
      name: 'PBKDF2',
      salt,
    },
    baseKey,
    { length: 256, name: verificationAlg },
    false,
    ['encrypt', 'decrypt'],
  )
}

export async function encryptVerificationString(masterKey: CryptoKey, version = v) {
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const encoder = new TextEncoder()

  const ciphertext = await crypto.subtle.encrypt(
    { iv, name: verificationAlg },
    masterKey,
    encoder.encode(`${VERIFICATION_PLAINTEXT}:v${version}`),
  )

  return {
    ciphertext: Array.from(new Uint8Array(ciphertext)),
    iv: Array.from(iv),
  }
}

export async function generateEncryptionProfile(
  passphrase: string,
  salt: Uint8Array,
): Promise<EncryptionProfile> {
  const iterations = PBKDF2_ITERATIONS
  const newKey = await deriveMasterKey(passphrase, salt, iterations)
  const { ciphertext, iv } = await encryptVerificationString(newKey)
  const salt_b64 = bytesToBase64(salt)
  const ciphertext_b64 = bytesToBase64(new Uint8Array(ciphertext))
  const iv_b64 = bytesToBase64(new Uint8Array(iv))

  return {
    iterations,
    kdf,
    salt_b64,
    v,
    verification: {
      alg: verificationAlg,
      ciphertext_b64,
      iv_b64,
    },
  }
}

export function generateUserSalt() {
  return crypto.getRandomValues(new Uint8Array(16))
}

export async function validatePassphrase(passphrase: string, encryptionProfile: EncryptionProfile) {
  // Switch behavior based on profile version
  if (encryptionProfile.v !== 1) {
    throw new Error(`Unsupported encryption profile v${encryptionProfile.v}`)
  }

  const saltBytes = base64ToBytes(encryptionProfile.salt_b64)
  const masterKey = await deriveMasterKey(passphrase, saltBytes, encryptionProfile.iterations)

  try {
    const iv = base64ToBytes(encryptionProfile.verification.iv_b64)
    const ciphertext = base64ToBytes(encryptionProfile.verification.ciphertext_b64)

    const decrypted = await crypto.subtle.decrypt({ iv, name: 'AES-GCM' }, masterKey, ciphertext)

    const text = new TextDecoder().decode(decrypted)
    return text === `${VERIFICATION_PLAINTEXT}:v${encryptionProfile.v}`
  } catch {
    return false
  }
}

const base64ToBytes = (b64: string) => new Uint8Array([...atob(b64)].map((c) => c.charCodeAt(0)))
const bytesToBase64 = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes))

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  const copy = new Uint8Array(bytes.byteLength)
  copy.set(bytes)
  return copy.buffer
}
