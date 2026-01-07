import { RedisClient } from '../types'

export const mockRedisClient = () => {
  const set = jest.fn()
  const get = jest.fn()
  const ttl = jest.fn()
  return { get, set, ttl } as unknown as RedisClient
}
