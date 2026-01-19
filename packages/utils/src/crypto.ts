import { base64ToBytes, bytesToBase64, toArrayBuffer } from './crypto.helpers'
import { EncryptionProfile } from './crypto.types'

const kdf = 'PBKDF2-SHA256'
const v = 1
const VERIFICATION_PLAINTEXT = 'markdown-memory:passphrase-check'
const PBKDF2_ITERATIONS = 250_000
const ENCRYPT_ALG = 'AES-GCM'

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
    { length: 256, name: ENCRYPT_ALG },
    false,
    ['encrypt', 'decrypt'],
  )
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
      alg: ENCRYPT_ALG,
      ciphertext_b64,
      iv_b64,
    },
  }
}

export async function validatePassphrase(passphrase: string, encryptionProfile: EncryptionProfile) {
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

async function encryptVerificationString(masterKey: CryptoKey, version = v) {
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const encoder = new TextEncoder()

  const ciphertext = await crypto.subtle.encrypt(
    { iv, name: ENCRYPT_ALG },
    masterKey,
    encoder.encode(`${VERIFICATION_PLAINTEXT}:v${version}`),
  )

  return {
    ciphertext: Array.from(new Uint8Array(ciphertext)),
    iv: Array.from(iv),
  }
}
