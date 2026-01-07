import { RedisClient } from '../types'

export const mockRedisClient = () => {
  const get = jest.fn()
  const ttl = jest.fn()
  return { get, ttl } as unknown as RedisClient
}
