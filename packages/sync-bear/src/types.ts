export interface AssetsFolderDetails {
  assetCount: number
  assetsPath: string
}

export interface BearSourceDetails {
  database?: DatabaseDetails | null
  files?: AssetsFolderDetails | null
  images?: AssetsFolderDetails | null
  isValid: boolean
  sourcePath: string
}

export interface DatabaseDetails {
  exists: boolean
  lastModified?: Date | null
  path: string
  sizeMb?: null | string
}
