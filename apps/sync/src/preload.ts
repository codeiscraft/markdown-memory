import { Sources } from '@mdm/profile/types'
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'

import { SyncStatusData } from './types'

const onSyncStatus = (callback: (data: SyncStatusData) => void) => {
  const handler = (_event: IpcRendererEvent, data: SyncStatusData) => callback(data)
  // ipcRenderer.on('sync-status', handler)
  return () => ipcRenderer.removeListener('sync-status', handler)
}
const verifyDirectoryExists = (source: Sources, path: string) =>
  ipcRenderer.invoke('directory-exists', source, path)
//const triggerSync = (sets: NoteSet[]) => ipcRenderer.send('trigger-sync', sets)

contextBridge.exposeInMainWorld('electronAPI', { onSyncStatus, verifyDirectoryExists })
