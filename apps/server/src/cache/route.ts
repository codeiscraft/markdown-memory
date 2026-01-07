import { RedisClient } from '@mdm/cache'
import { Router } from 'express'

import get from './get'
import post from './post'

export function createCacheRoutes(redis: RedisClient) {
  const router = Router()

  router.get('/api/cache/:key', get(redis))
  router.post('/api/cache', post(redis))

  return router
}
