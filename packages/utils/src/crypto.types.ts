export interface EncryptionProfile {
  iterations: number
  kdf: string
  salt_b64: string
  v: number
  verification: {
    alg: string
    ciphertext_b64: string
    iv_b64: string
  }
}
