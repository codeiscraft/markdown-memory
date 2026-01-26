import { RedisClient } from '@mdm/cache'
import { Router } from 'express'

import get from './get'
import post from './post'

export function createCacheHashRoutes(redis: RedisClient) {
  const router = Router()

  router.get('/api/cache/hash/:key', get(redis))
  router.post('/api/cache/hash', post(redis))

  return router
}
