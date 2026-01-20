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

export interface ElectronAPI {
  onSyncStatus: (callback: SyncStatusCallback) => SyncStatusUnsubcribeFunction
  verifyDirectoryExists: (source: Sources, path: string) => Promise<SourceDirectoryDetails>
}

export interface ElectronWindow extends Window {
  electronAPI: ElectronAPI
}

export interface SourceDirectoryDetails {
  directoryPath: string
  isValid: boolean
}
export type Sources = 'bear' | 'file' | 'obsidian'

export type SyncState = 'error' | 'idle' | 'setsLoading' | 'setsReady' | 'syncComplete'
export type SyncStatusCallback = (data: SyncStatusData) => void
export interface SyncStatusData {
  error?: string
  status: SyncState
}

export type SyncStatusUnsubcribeFunction = () => void
