import { stat } from 'node:fs/promises'
import { readdir } from 'node:fs/promises'
import * as path from 'node:path'

import { BEAR_DATABASE_FILE, BEAR_FILES_FOLDER, BEAR_IMAGES_FOLDER } from './constants.js'
import { AssetsFolderDetails, BearSourceDetails, DatabaseDetails } from './types.js'

async function countFilesRecursive(root: string): Promise<number> {
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

const gatherDatabaseDetails = async (sourcePath: string): Promise<DatabaseDetails | null> => {
  const databasePath = path.join(sourcePath, BEAR_DATABASE_FILE)
  try {
    const databaseStats = await stat(databasePath)
    if (databaseStats.isFile()) {
      const lastModified = databaseStats.mtimeMs ? new Date(databaseStats.mtimeMs) : null
      const sizeMb = databaseStats.size ? (databaseStats.size / (1024 * 1024)).toFixed(2) : null

      return {
        exists: true,
        lastModified,
        path: databasePath,
        sizeMb,
      }
    }
  } catch {}
  return { exists: false, path: databasePath }
}

const gatherAssetsDetails = async (
  sourcePath: string,
  assetsPath: string,
): Promise<AssetsFolderDetails | null> => {
  const fullAssetsPath = path.join(sourcePath, assetsPath)
  try {
    const assetsStats = await stat(fullAssetsPath)
    if (assetsStats.isDirectory()) {
      const assetCount = await countFilesRecursive(fullAssetsPath)
      return {
        assetCount,
        assetsPath,
      }
    }
  } catch {}
  return {
    assetCount: 0,
    assetsPath,
  }
}

export async function validateBearSourcePath(resolvedPath: string): Promise<BearSourceDetails> {
  console.log('validating bear source path', resolvedPath)
  const database = await gatherDatabaseDetails(resolvedPath)
  console.log('gathered database details', database)
  const images = await gatherAssetsDetails(resolvedPath, BEAR_IMAGES_FOLDER)
  const files = await gatherAssetsDetails(resolvedPath, BEAR_FILES_FOLDER)

  return {
    database,
    files,
    images,
    isValid: false,
    sourcePath: resolvedPath,
  }
}
