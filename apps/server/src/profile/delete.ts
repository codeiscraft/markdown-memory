import type { Request, Response } from 'express'

import { RedisClient } from '@mdm/cache'

import { createProfileKey } from './key'

export default function deleteProfile(redis: RedisClient) {
  return async (req: Request, res: Response) => {
    try {
      const slug = typeof req.params.slug === 'string' ? req.params.slug : undefined

      if (!slug) {
        return res.status(400).json({ error: "Missing required route param ':slug'" })
      }

      const key = createProfileKey(slug)
      const deleted = await redis.del(key)

      if (deleted === 0) {
        return res.status(404).json({ error: 'Profile not found' })
      }

      return res.status(204).send()
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Failed to delete profile' })
    }
  }
}
