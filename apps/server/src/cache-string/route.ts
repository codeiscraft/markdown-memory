import { RedisClient } from '@mdm/cache'
import { Router } from 'express'

import get from './get'
import post from './post'

export function createCacheStringRoutes(redis: RedisClient) {
  const router = Router()

  router.get('/api/cache/string/:key', get(redis))
  router.post('/api/cache/string', post(redis))

  return router
}
