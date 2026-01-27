import { RedisClient } from '@mdm/cache'
import { Router } from 'express'

import getAll from './get-all'
import deleteProfile from './get-all'
import getById from './get-by-id'
import put from './put'

export function createProfileRoutes(redis: RedisClient) {
  const router = Router()

  router.get('/api/profile', getAll(redis))
  router.get('/api/profile/:slug', getById(redis))
  router.put('/api/profile/:slug', put(redis))
  router.delete('/api/profile/:id', deleteProfile(redis))

  return router
}
