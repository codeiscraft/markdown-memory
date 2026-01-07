import { logError, logGet, logSet } from '../logging'
import { RedisClient, RedisSafeGetResult } from '../types'

export async function getKeySafely<T>(
  redis: RedisClient,
  key: string,
): Promise<RedisSafeGetResult<T> | undefined> {
  try {
    logGet(key, 'key')
    const ttlSeconds = await redis.ttl(key)
    const value = (await redis.get(key)) as T
    return value ? { key, ttlSeconds, value } : undefined
  } catch (e) {
    logError(e as Error)
    return undefined
  }
}

export async function setKeyValueSafely(
  redis: RedisClient,
  key: string,
  value: string,
  ttlSeconds?: number,
): Promise<boolean> {
  try {
    logSet(key, ttlSeconds)
    if (typeof ttlSeconds === 'number' && !isNaN(ttlSeconds)) {
      await redis.set(key, value, { EX: ttlSeconds })
    } else {
      await redis.set(key, value)
    }
    return true
  } catch (e) {
    logError(e as Error)
    return false
  }
}
