import { Router } from 'express'

import get from './get'

export function createIdentityRoutes() {
  const router = Router()

  router.get('/api/identity', get())

  return router
}
