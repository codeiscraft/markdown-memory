export interface AssetsFolderDetails {
  assetCount: number
  assetsPath: string
  isValid: boolean
}

export interface BearSourceDetails {
  database?: DatabaseDetails | null
  files?: AssetsFolderDetails | null
  images?: AssetsFolderDetails | null
}

export interface DatabaseDetails {
  file: string
  isValid: boolean
  lastModified?: Date | null
  path: string
  sizeMb?: null | string
}
