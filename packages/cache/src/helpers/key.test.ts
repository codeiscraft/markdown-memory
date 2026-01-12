import { jest } from '@jest/globals'
import { asMock } from '@mdm/testing-support/mocks'
import { mockRedisClient } from '@mdm/testing-support/redis'

import { logError } from '../logging'
import { getKeySafely, setKeyValueSafely } from './key'

jest.mock('../logging')

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

describe('setKeySafely', () => {
  test('sets key without ttl', async () => {
    const redis = mockRedisClient()

    const result = await setKeyValueSafely(redis, 'testKey', 'testValue')

    expect(redis.set).toHaveBeenCalledWith('testKey', 'testValue')
    expect(result).toBeTruthy()
  })

  test('sets key with ttl', async () => {
    const redis = mockRedisClient()

    const result = await setKeyValueSafely(redis, 'testKey', 'testValue', 60)

    expect(redis.set).toHaveBeenCalledWith('testKey', 'testValue', { EX: 60 })
    expect(result).toBeTruthy()
  })

  test('handles errors', async () => {
    const redis = mockRedisClient()
    const testError = new Error('test error')
    asMock(redis.set).mockImplementationOnce(() => {
      throw testError
    })

    const result = await setKeyValueSafely(redis, 'testKey', 'testValue')

    expect(redis.set).toHaveBeenCalledWith('testKey', 'testValue')
    expect(result).toBeFalsy()
    expect(logError).toHaveBeenCalledWith(testError)
  })
})
