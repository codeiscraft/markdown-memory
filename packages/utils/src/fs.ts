import { constants } from 'node:fs'
import { access, stat } from 'node:fs/promises'
import { readdir } from 'node:fs/promises'
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

export async function countFilesRecursive(root: string): Promise<number> {
  let count = 0
  const entries = await readdir(root, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(root, entry.name)
    if (entry.isDirectory()) {
      count += await countFilesRecursive(fullPath)
    } else if (entry.isFile()) {
      count += 1
    }
  }

  return count
}

export async function directoryFileCount(
  dirPath: string,
): Promise<{ assetCount: number; isValid: boolean }> {
  const dirStats = await stat(dirPath)
  if (dirStats.isDirectory()) {
    const assetCount = await countFilesRecursive(dirPath)
    return { assetCount, isValid: true }
  } else {
    return { assetCount: 0, isValid: false }
  }
}

export async function fileStats(
  filePath: string,
): Promise<{ isValid: boolean; lastModified?: Date | null; sizeMb?: null | string }> {
  const fileStats = await stat(filePath)
  if (fileStats.isFile()) {
    const lastModified = fileStats.mtimeMs ? new Date(fileStats.mtimeMs) : null
    const sizeMb = fileStats.size ? (fileStats.size / (1024 * 1024)).toFixed(2) : null
    return { isValid: true, lastModified, sizeMb }
  } else {
    return { isValid: false }
  }
}

export const joinPath = (...paths: string[]): string => path.join(...paths)
