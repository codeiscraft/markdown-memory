import { SourceDirectoryDetails, Sources } from '@mdm/profile'

export interface ElectronAPI {
  onSyncStatus: (callback: SyncStatusCallback) => SyncStatusUnsubcribeFunction
  verifyDirectoryExists: (source: Sources, path: string) => Promise<SourceDirectoryDetails>
}
export interface ElectronWindow extends Window {
  electronAPI: ElectronAPI
}

export type SyncState = 'error' | 'idle' | 'setsLoading' | 'setsReady' | 'syncComplete'
export type SyncStatusCallback = (data: SyncStatusData) => void
export interface SyncStatusData {
  error?: string
  status: SyncState
}

export type SyncStatusUnsubcribeFunction = () => void
