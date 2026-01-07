import type { Request, Response } from 'express'

import { RedisClient, setKeyValueSafely } from '@mdm/cache'

export default function post(redis: RedisClient) {
  return async (req: Request, res: Response) => {
    const { key, value } = req.body
    if (typeof key !== 'string' || typeof value !== 'string') {
      return res.status(400).json({ error: 'key and value must be strings' })
    }
    const result = await setKeyValueSafely(redis, key, value)
    return result
      ? res.json({ key, value })
      : res.status(500).json({ error: 'failed to save to cache' })
  }
}
