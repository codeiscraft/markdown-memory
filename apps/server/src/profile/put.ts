import type { Request, Response } from 'express'

import { RedisClient, setKeyValueSafely } from '@mdm/cache'

import { createProfileKey } from './key'

export default function put(redis: RedisClient) {
  return async (req: Request, res: Response) => {
    const { slug } = req.params
    const { profile, ttlSeconds } = req.body
    // if (typeof profile !== 'string' || profile === null) {
    //   return res.status(400).json({ error: 'missing profile content' })
    // }
    console.log('PUT profile', { profile, slug, ttlSeconds })
    const key = createProfileKey(slug)
    const result = await setKeyValueSafely(redis, key, profile, ttlSeconds)
    return result
      ? res.json({ key, profile, ttlSeconds })
      : res.status(500).json({ error: 'failed to save to cache' })
  }
}
