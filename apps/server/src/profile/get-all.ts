import type { Request, Response } from 'express'

import { RedisClient, scanKeys } from '@mdm/cache'

import { createProfileKey } from './key'

export default function getAll(redis: RedisClient) {
  return async (req: Request, res: Response) => {
    const cursorParam = typeof req.query.cursor === 'string' ? req.query.cursor : '0'
    const limitParam = typeof req.query.limit === 'string' ? parseInt(req.query.limit, 10) : 50
    const pattern = createProfileKey('*')
    const scanResults = await scanKeys(redis, pattern, cursorParam, limitParam)
    if (!scanResults) {
      res.status(500).json({ error: 'Failed to scan profile keys' })
      return
    }
    return res.json(scanResults)
  }
}
