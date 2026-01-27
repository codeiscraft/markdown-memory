import type { Request, Response } from 'express'

import { RedisClient } from '@mdm/cache'

import { createProfileKey } from './key'

export default function deleteProfile(redis: RedisClient) {
  return async (req: Request, res: Response) => {
    try {
      const id = typeof req.params.id === 'string' ? req.params.id : undefined

      if (!id) {
        return res.status(400).json({ error: "missing required route param ':id'" })
      }

      const key = createProfileKey(id)
      const deleted = await redis.del(key)

      if (deleted === 0) {
        return res.status(404).json({ error: 'profile not found' })
      }

      return res.status(204).send()
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'failed to delete profile' })
    }
  }
}
