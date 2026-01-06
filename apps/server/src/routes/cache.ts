import type { Request, Response } from 'express'

import { getKeySafely, RedisClient, setKeyValueSafely } from '@mdm/cache'
import { Router } from 'express'

export const get = (redis: RedisClient) => async (req: Request, res: Response) => {
  const { key } = req.params
  const result = await getKeySafely(redis, key)
  return result
    ? res.json({ key, value: result.value })
    : res.status(404).json({ error: `key not found: ${key}` })
}

export const post = (redis: RedisClient) => async (req: Request, res: Response) => {
  const { key, value } = req.body
  if (typeof key !== 'string' || typeof value !== 'string') {
    return res.status(400).json({ error: 'key and value must be strings' })
  }
  const result = await setKeyValueSafely(redis, key, value)
  return result
    ? res.json({ key, value })
    : res.status(500).json({ error: 'failed to save to cache' })
}

export function createCacheRoutes(redis: RedisClient) {
  const router = Router()

  router.get('/api/cache/:key', get(redis))
  router.post('/api/cache', post(redis))

  return router
}
