import { deriveMasterKey, generateEncryptionProfile, validatePassphrase } from './crypto'

const salt = new Uint8Array([1, 2, 3, 4])

describe('Crypto Utils', () => {
  test('deriveMasterKey generates a key', async () => {
    const key = await deriveMasterKey('test-passphrase', new Uint8Array([1, 2, 3, 4]))
    expect(key.type).toBe('secret')
    expect(key.extractable).toBe(false)
    expect(key.algorithm.name).toBe('AES-GCM')
    expect((key.algorithm as AesKeyAlgorithm).length).toBe(256)
    expect(key.usages).toEqual(['encrypt', 'decrypt'])
  })

  test('a passphrase and salt can be used to generate an encryption profile', async () => {
    const profile = await generateEncryptionProfile('test-passphrase', salt)
    expect(profile.iterations).toBe(400000)
    expect(profile.salt_b64).toBe('AQIDBA==')
    expect(profile.verification.alg).toBe('AES-GCM')
    expect(typeof profile.verification.ciphertext_b64).toBe('string')
    expect(typeof profile.verification.iv_b64).toBe('string')
    expect(profile.kdf).toBe('PBKDF2-SHA256')
    expect(profile.v).toBe(1)
  })

  test('generating two encryption profiles with the same passphrase and salt results in different verification ciphertexts', async () => {
    const profile1 = await generateEncryptionProfile('test-passphrase', salt)
    const profile2 = await generateEncryptionProfile('test-passphrase', salt)

    expect(profile1.verification.ciphertext_b64).not.toBe(profile2.verification.ciphertext_b64)
  })

  test('passphrase can be validated', async () => {
    const profile = await generateEncryptionProfile('test-passphrase', salt)

    const valid = await validatePassphrase('test-passphrase', profile)
    expect(valid).toBe(true)
  })

  test('passphrase validation fails with incorrect passphrase', async () => {
    const profile = await generateEncryptionProfile('test-passphrase', salt)

    const valid = await validatePassphrase('wrong-passphrase', profile)
    expect(valid).toBe(false)
  })

  test('passphrase validation fails with mismatched version', async () => {
    const profile = await generateEncryptionProfile('test-passphrase', salt)
    profile.v = 2

    await expect(validatePassphrase('test-passphrase', profile)).rejects.toThrow(
      'Unsupported encryption profile v2',
    )
  })
})
