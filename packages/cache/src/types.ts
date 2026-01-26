import { createClient } from 'redis'

export interface HashSetRequest<T> {
  key: string
  ttlSeconds: number
  value: T
}

export type RedisClient = ReturnType<typeof createClient>

export interface RedisSafeGetResult<T> {
  key: string
  ttlSeconds: number
  value: null | T
}
