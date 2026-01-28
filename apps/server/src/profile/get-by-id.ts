import type { Request, Response } from 'express'

import { getKeySafely, RedisClient } from '@mdm/cache'

import { createProfileKey } from './key'

export default function getById(redis: RedisClient) {
  return async (req: Request, res: Response) => {
    const { slug } = req.params
    const key = createProfileKey(slug)
    const result = await getKeySafely(redis, key)
    return result ? res.json(result) : res.status(404).json({ error: `key not found: ${key}` })
  }
}
