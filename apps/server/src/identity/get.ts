import { Request, Response } from 'express'

import { commit, version } from './util'

const product = 'markdown-memory'
const apiVersion = 1

export default function get() {
  return async (_req: Request, res: Response) =>
    res.json({
      apiVersion,
      commit: commit(),
      product,
      version: version(),
    })
}
