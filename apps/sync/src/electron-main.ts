import { app, BrowserWindow, ipcMain } from 'electron'
import { stat } from 'node:fs/promises'
import { homedir } from 'node:os'
import * as path from 'path'

const icon = '../renderer/apple-touch-icon.png'

function createWindow() {
  const win = new BrowserWindow({
    height: 600,
    icon: path.join(__dirname, icon),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
    },
    width: 650,
  })

  const devUrl = process.env.ELECTRON_START_URL
  if (devUrl) {
    win.loadURL(devUrl)
  } else {
    win.loadFile(path.join(__dirname, '../renderer/index.html'))
  }

  return win
}

app.setName('markdown memory|sync')

if (process.platform === 'darwin') {
  app?.dock?.setIcon(path.join(__dirname, icon))
}

app.whenReady().then(() => {
  createWindow()
})

ipcMain.handle('directory-exists', async (_event, directoryPath: string) => {
  try {
    const resolvedPath = directoryPath.startsWith('~/')
      ? path.join(homedir(), directoryPath.slice(2))
      : directoryPath
    const stats = await stat(resolvedPath)
    // TODO: consider checking permissions here as well
    // TODO: bear: display size of sqlite db file, location of attachments folder
    // TODO: obsidian: display number of files in vault, size on disk
    return stats.isDirectory()
  } catch {
    return false
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
