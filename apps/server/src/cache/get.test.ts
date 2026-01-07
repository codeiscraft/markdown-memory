import { getKeySafely } from '@mdm/cache'
import { mockRedisClient } from '@mdm/cache/testing-support'
import { asMock } from '@mdm/testing-support/mocks'

import { mockRequest } from '../testing-support/request'
import { mockResponse } from '../testing-support/response'
import get from './get'

jest.mock('@mdm/cache')

describe('GET /cache', () => {
  test('returns located key from redis', async () => {
    const redis = mockRedisClient()
    const response = mockResponse()
    const request = mockRequest({ params: { key: 'test' } })
    const testResult = { key: 'test', ttlSeconds: 60, value: 'result' }
    asMock(getKeySafely).mockResolvedValue(testResult)

    const getFn = get(redis)
    const result = await getFn(request, response)

    expect(getKeySafely).toHaveBeenCalledWith(redis, 'test')
    expect(response.status).not.toHaveBeenCalled()
    expect(response.json).toHaveBeenCalledWith(testResult)
    expect(result).toEqual(testResult)
  })

  test('returns 404 if key not found', async () => {
    const redis = mockRedisClient()
    const response = mockResponse()
    const request = mockRequest({ params: { key: 'test' } })
    asMock(getKeySafely).mockResolvedValue(undefined)

    const getFn = get(redis)
    await getFn(request, response)

    expect(getKeySafely).toHaveBeenCalledWith(redis, 'test')
    expect(response.status).toHaveBeenCalledWith(404)
    expect(response.json).toHaveBeenCalledWith({ error: `key not found: test` })
  })
})
