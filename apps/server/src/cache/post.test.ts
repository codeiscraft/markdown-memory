import { setKeyValueSafely } from '@mdm/cache'
import { mockRedisClient } from '@mdm/cache/testing-support'
import { asMock } from '@mdm/testing-support/mocks'

import { mockRequest } from '../testing-support/request'
import { mockResponse } from '../testing-support/response'
import post from './post'

jest.mock('@mdm/cache')

describe('POST /cache', () => {
  test('status 400 if body is not formatted correct', async () => {
    const redis = mockRedisClient()
    const response = mockResponse()
    const request = mockRequest({ body: {} })

    const postFn = post(redis)
    await postFn(request, response)

    expect(setKeyValueSafely).not.toHaveBeenCalled()
    expect(response.status).toHaveBeenCalledWith(400)
    expect(response.json).toHaveBeenCalledWith({ error: 'key and value must be strings' })
  })

  test('set key successfully, no ttl', async () => {
    const redis = mockRedisClient()
    const response = mockResponse()
    const body = { key: 'testKey', value: 'testValue' }
    const request = mockRequest({ body })
    asMock(setKeyValueSafely).mockResolvedValue(true)

    const postFn = post(redis)
    await postFn(request, response)

    expect(setKeyValueSafely).toHaveBeenCalledWith(redis, 'testKey', 'testValue', undefined)
    expect(response.json).toHaveBeenCalledWith(body)
  })

  test('set key successfully with ttl', async () => {
    const redis = mockRedisClient()
    const response = mockResponse()
    const body = { key: 'testKey', ttlSeconds: 30, value: 'testValue' }
    const request = mockRequest({ body })
    asMock(setKeyValueSafely).mockResolvedValue(true)

    const postFn = post(redis)
    await postFn(request, response)

    expect(setKeyValueSafely).toHaveBeenCalledWith(redis, 'testKey', 'testValue', 30)
    expect(response.json).toHaveBeenCalledWith(body)
  })

  test('set key fails', async () => {
    const redis = mockRedisClient()
    const response = mockResponse()
    const body = { key: 'testKey', ttlSeconds: 30, value: 'testValue' }
    const request = mockRequest({ body })
    asMock(setKeyValueSafely).mockResolvedValue(false)

    const postFn = post(redis)
    await postFn(request, response)

    expect(setKeyValueSafely).toHaveBeenCalledWith(redis, 'testKey', 'testValue', 30)
    expect(response.status).toHaveBeenCalledWith(500)
    expect(response.json).toHaveBeenCalledWith({ error: 'failed to save to cache' })
  })
})
