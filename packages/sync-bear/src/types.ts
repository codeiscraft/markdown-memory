export interface AssetsFolderDetails {
  assetCount: number
  assetsPath: string
}

export interface BearSourceDetails {
  database?: DatabaseDetails | null
  files?: AssetsFolderDetails | null
  images?: AssetsFolderDetails | null
}

export interface DatabaseDetails {
  exists: boolean
  file: string
  lastModified?: Date | null
  path: string
  sizeMb?: null | string
}
