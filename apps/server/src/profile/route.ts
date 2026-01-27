import { RedisClient } from '@mdm/cache'
import { Router } from 'express'

import getAll from './get-all'
import deleteProfile from './get-all'
import getById from './get-by-id'
import put from './put'

export function createProfileRoutes(redis: RedisClient) {
  const router = Router()

  router.get('/api/profiles', getAll(redis))
  router.get('/api/profiles/:slug', getById(redis))
  router.put('/api/profiles/:slug', put(redis))
  router.delete('/api/profiles/:slug', deleteProfile(redis))

  return router
}
