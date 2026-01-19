export interface ElectronAPI {
  onSyncStatus: (callback: SyncStatusCallback) => SyncStatusUnsubcribeFunction
  verifyDirectoryExists: (path: string) => Promise<boolean>
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
