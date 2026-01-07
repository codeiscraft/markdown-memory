import type { NextFunction, Request, Response } from 'express'

import express from 'express'
import morgan from 'morgan'
import { createClient } from 'redis'

import { createCacheRoutes } from './cache/route'

const host = process.env.MDM_HOST || '0.0.0.0'
const port = Number(process.env.MDM_PORT) || 8100

const startMessage = () => console.log(`markdown memory running on ${host}:${port}`)

const redisUrl = process.env.VALKEY_URL || 'redis://valkey:6379'
const redisClient = createClient({ url: redisUrl })
redisClient.connect().catch(console.error)

export const startup = async () => {
  const app = express()

  app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
  app.use(express.json())

  app.use(createCacheRoutes(redisClient))

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err)
    return res.status(500).json({ error: 'Internal Server Error' })
  })

  const server = app.listen(port, host, startMessage)
  server.on('error', (err: Error) => {
    console.error('server error:', err)
    process.exit(1)
  })
}
