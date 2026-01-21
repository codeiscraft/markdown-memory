import { directoryFileCount, fileStats, joinPath } from '@mdm/utils/fs'

import { BEAR_DATABASE_FILE, BEAR_FILES_FOLDER, BEAR_IMAGES_FOLDER } from './constants.js'
import { AssetsFolderDetails, BearSourceDetails, DatabaseDetails } from './types'

const gatherDatabaseDetails = async (sourcePath: string): Promise<DatabaseDetails | null> => {
  const databasePath = joinPath(sourcePath, BEAR_DATABASE_FILE)
  const { isValid, lastModified, sizeMb } = await fileStats(databasePath)
  return {
    file: BEAR_DATABASE_FILE,
    isValid,
    lastModified,
    path: databasePath,
    sizeMb,
  }
}

const gatherAssetsDetails = async (
  sourcePath: string,
  assetsPath: string,
): Promise<AssetsFolderDetails | null> => {
  const fullAssetsPath = joinPath(sourcePath, assetsPath)
  const { assetCount, isValid } = await directoryFileCount(fullAssetsPath)

  return {
    assetCount,
    assetsPath,
    isValid,
  }
}

export async function validateBearSourcePath(resolvedPath: string): Promise<BearSourceDetails> {
  const database = await gatherDatabaseDetails(resolvedPath)
  const images = await gatherAssetsDetails(resolvedPath, BEAR_IMAGES_FOLDER)
  const files = await gatherAssetsDetails(resolvedPath, BEAR_FILES_FOLDER)

  const bearSource = {
    database,
    files,
    images,
  }
  console.info(`Bear source details: ${JSON.stringify(bearSource)}`)
  return bearSource
}
