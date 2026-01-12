import { createClient } from 'redis'

export const mockRedisClient = () => {
  const set = jest.fn()
  const get = jest.fn()
  const ttl = jest.fn()
  return { get, set, ttl } as unknown as ReturnType<typeof createClient>
}
