import { logGet, logSet } from '../logging'
import { RedisClient, RedisSafeGetResult } from '../types'

export async function getHashSafely<T extends Record<string, unknown>>(
  redis: RedisClient,
  key: string,
): Promise<RedisSafeGetResult<T> | undefined> {
  try {
    logGet(key, 'hash')
    const ttlSeconds = await redis.ttl(key)
    const raw = (await redis.hGetAll(key)) as T
    const exists = raw && Object.keys(raw).length === 0 ? false : true
    const value = parseRecordDeep<T>(raw)
    return exists ? { key, ttlSeconds, value } : undefined
  } catch (e) {
    console.error(e)
    return undefined
  }
}

export function parseRecordDeep<T extends Record<string, unknown>>(
  input: Record<string, unknown>,
): T {
  const result: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(input)) {
    result[key] = tryParse(value)
  }

  return result as T
}

export async function setHashValueSafely(
  redis: RedisClient,
  key: string,
  value: Record<string, unknown>,
  ttlSeconds?: number,
): Promise<boolean> {
  try {
    logSet(key, ttlSeconds)
    const stringified = stringifyRecordDeep(value)
    await redis.hSet(key, stringified)
    if (typeof ttlSeconds === 'number' && !isNaN(ttlSeconds)) {
      await redis.expire(key, ttlSeconds)
    }
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

export function stringifyRecordDeep(input: Record<string, unknown>): Record<string, string> {
  const result: Record<string, string> = {}

  for (const [key, value] of Object.entries(input)) {
    result[key] = stringifyValue(value)
  }

  return result
}

function stringifyValue(value: unknown): string {
  if (value === null || value === undefined) {
    return 'null'
  }

  if (typeof value === 'string') {
    return value
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }

  return JSON.stringify(value)
}

function tryParse(value: unknown): unknown {
  try {
    return JSON.parse(value as string)
  } catch {
    return value
  }
}
