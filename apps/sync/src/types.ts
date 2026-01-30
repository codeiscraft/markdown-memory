import { GatherSourceDetails } from '@mdm/source/types'

export interface ElectronAPI {
  gatherSourceDetails: GatherSourceDetails
  onSyncStatus: (callback: SyncStatusCallback) => SyncStatusUnsubcribeFunction
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
