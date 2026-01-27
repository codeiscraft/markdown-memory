import { RedisClient } from '../types'

export interface ScanKeysResult {
  cursor: string
  ids: string[]
}

export async function scanKeys(
  redis: RedisClient,
  pattern: string,
  cursorParam = '0',
  limitParam = 50,
): Promise<null | ScanKeysResult> {
  try {
    const { cursor: nextCursor, keys } = await redis.scan(cursorParam, {
      COUNT: Number.isFinite(limitParam) ? limitParam : 50,
      MATCH: pattern,
    })

    const ids = keys.map((key: string) => key.replace(/^profile:/, ''))

    return {
      cursor: nextCursor,
      ids,
    }
  } catch {
    return null
  }
}
