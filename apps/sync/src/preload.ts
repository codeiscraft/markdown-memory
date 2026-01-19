import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'

import { SyncStatusData } from './types'

const onSyncStatus = (callback: (data: SyncStatusData) => void) => {
  const handler = (_event: IpcRendererEvent, data: SyncStatusData) => callback(data)
  // ipcRenderer.on('sync-status', handler)
  return () => ipcRenderer.removeListener('sync-status', handler)
}
const verifyDirectoryExists = (path: string) => ipcRenderer.invoke('directory-exists', path)
//const triggerSync = (sets: NoteSet[]) => ipcRenderer.send('trigger-sync', sets)

contextBridge.exposeInMainWorld('electronAPI', { onSyncStatus, verifyDirectoryExists })
