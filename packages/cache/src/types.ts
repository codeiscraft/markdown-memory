import { createClient } from 'redis'

export type RedisClient = ReturnType<typeof createClient>

export interface RedisSafeGetResult<T> {
  key: string
  ttlSeconds: number
  value: null | T
}
