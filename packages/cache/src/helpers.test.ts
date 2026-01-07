import { asMock } from '@mdm/testing-support/mocks'

import { getKeySafely } from './helpers'
import { logError } from './logging'
import { mockRedisClient } from './testing-support'

jest.mock('./logging')

describe('getKeySafely', () => {
  test('returns a matched key from redis', async () => {
    const redis = mockRedisClient()
    asMock(redis.ttl).mockResolvedValue(60)
    asMock(redis.get).mockResolvedValue('testValue')

    const result = await getKeySafely(redis, 'testKey')

    expect(result).toEqual({ key: 'testKey', ttlSeconds: 60, value: 'testValue' })
  })
  test('return undefined for an unmatched key in redis', async () => {
    const redis = mockRedisClient()
    asMock(redis.ttl).mockResolvedValue(60)
    asMock(redis.get).mockResolvedValue(null)

    const result = await getKeySafely(redis, 'testKey')

    expect(result).toBeUndefined()
  })

  test('return undefined if an error occurs', async () => {
    const redis = mockRedisClient()
    asMock(redis.ttl).mockResolvedValue(60)
    const testError = new Error('test error')
    asMock(redis.get).mockImplementationOnce(() => {
      throw testError
    })

    const result = await getKeySafely(redis, 'testKey')

    expect(result).toBeUndefined()
    expect(logError).toHaveBeenCalledWith(testError)
  })
})
