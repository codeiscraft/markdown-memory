import { Router } from 'express'

export function createNotesRoutes() {
  const router = Router()

  router.get('/api/notes', async (_req, res, _next) => {
    res.json(['a', 'b', 'c'])
  })

  return router
}
