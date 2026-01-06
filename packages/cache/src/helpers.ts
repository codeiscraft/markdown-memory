import { logGet, logSet } from './logging'
import { RedisClient, RedisSafeGetResult } from './types'

export async function getHashSafely<T>(
  redis: RedisClient,
  key: string,
): Promise<RedisSafeGetResult<T> | undefined> {
  try {
    logGet(key, 'hash')
    const ttlSeconds = await redis.ttl(key)
    const value = (await redis.hgetall(key)) as T
    return value ? { key, ttlSeconds, value } : undefined
  } catch (e) {
    console.error(e)
    return undefined
  }
}

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
    console.error(e)
    return undefined
  }
}

export async function getSetSafely<T>(redis: RedisClient, key: string): Promise<T[]> {
  try {
    logGet(key, 'set')
    return redis.smembers(key) as Promise<T[]>
  } catch (e) {
    console.error(e)
    return []
  }
}

export async function replaceSetValueSafely(
  redis: RedisClient,
  key: string,
  values: string[],
  ttlSeconds?: number,
): Promise<boolean> {
  try {
    logSet(key, ttlSeconds)
    await redis.del(key)
    await redis.sadd(key, ...values)
    if (typeof ttlSeconds === 'number' && !isNaN(ttlSeconds)) {
      await redis.expire(key, ttlSeconds)
    }
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

export async function setHashValueSafely(
  redis: RedisClient,
  key: string,
  value: object,
  ttlSeconds?: number,
): Promise<boolean> {
  try {
    logSet(key, ttlSeconds)
    await redis.hset(key, value)
    if (typeof ttlSeconds === 'number' && !isNaN(ttlSeconds)) {
      await redis.expire(key, ttlSeconds)
    }
    return true
  } catch (e) {
    console.error(e)
    return false
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
    console.error(e)
    return false
  }
}
