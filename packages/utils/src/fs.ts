import { constants } from 'node:fs'
import { access, stat } from 'node:fs/promises'
import { homedir } from 'node:os'
import path from 'node:path'

export const resolveHomeDir = (thePath: string) =>
  thePath.startsWith('~/') ? path.join(homedir(), thePath.slice(2)) : thePath

export const isDirectoryWithReadAccess = async (checkPath: string): Promise<boolean> => {
  try {
    const stats = await stat(checkPath)
    await access(checkPath, constants.R_OK)
    return stats.isDirectory()
  } catch {
    return false
  }
}
