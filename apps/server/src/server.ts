import type { NextFunction, Request, Response } from 'express'

import express from 'express'
import morgan from 'morgan'

const host = process.env.MDM_HOST || '0.0.0.0'
const port = Number(process.env.MDM_PORT) || 8100

const startMessage = () => console.log(`markdown memory running on ${host}:${port}`)

export const startup = async () => {
  const app = express()

  app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

  app.get('/', (_req: Request, res: Response) => {
    res.json({ message: 'Hello from markdown memory!' })
  })

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err)
    res.status(500).json({ error: 'Internal Server Error' })
  })

  const server = app.listen(port, host, startMessage)
  server.on('error', (err: Error) => {
    console.error('server error:', err)
    process.exit(1)
  })
}
