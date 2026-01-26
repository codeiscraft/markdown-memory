import type { Request, Response } from 'express'

import { getHashSafely, RedisClient } from '@mdm/cache'

export default function get(redis: RedisClient) {
  return async (req: Request, res: Response) => {
    const { key } = req.params
    const result = await getHashSafely(redis, key)
    return result && result.value
      ? res.json(result)
      : res.status(404).json({ error: `key not found: ${key}` })
  }
}
