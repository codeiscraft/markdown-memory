import type { Request, Response } from 'express'

import { RedisClient, setHashValueSafely } from '@mdm/cache'

export default function post(redis: RedisClient) {
  return async (req: Request, res: Response) => {
    const { key, ttlSeconds, value } = req.body
    if (typeof key !== 'string' || typeof value !== 'string') {
      return res.status(400).json({ error: 'key and value must be strings' })
    }
    console.log('POST /api/cache/hash', { key, ttlSeconds, value })
    const hash = JSON.parse(value)
    const result = await setHashValueSafely(redis, key, hash, ttlSeconds)
    return result
      ? res.json({ key, ttlSeconds, value })
      : res.status(500).json({ error: 'failed to save to cache' })
  }
}
