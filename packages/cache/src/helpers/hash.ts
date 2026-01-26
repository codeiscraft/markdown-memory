import { logGet, logSet } from '../logging'
import { RedisClient, RedisSafeGetResult } from '../types'

export async function getHashSafely<T>(
  redis: RedisClient,
  key: string,
): Promise<RedisSafeGetResult<T> | undefined> {
  try {
    logGet(key, 'hash')
    const ttlSeconds = await redis.ttl(key)
    const value = (await redis.hGetAll(key)) as T
    const exists = value && Object.keys(value).length === 0 ? false : true
    return exists ? { key, ttlSeconds, value } : undefined
  } catch (e) {
    console.error(e)
    return undefined
  }
}

export async function setHashValueSafely(
  redis: RedisClient,
  key: string,
  value: Record<string, string>,
  ttlSeconds?: number,
): Promise<boolean> {
  try {
    logSet(key, ttlSeconds)
    await redis.hSet(key, value)
    if (typeof ttlSeconds === 'number' && !isNaN(ttlSeconds)) {
      await redis.expire(key, ttlSeconds)
    }
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}
