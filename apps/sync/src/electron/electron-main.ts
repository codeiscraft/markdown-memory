import { app, BrowserWindow } from 'electron'
import * as path from 'path'

function createWindow() {
  const win = new BrowserWindow({
    height: 450,
    icon: path.join(__dirname, '../../public/apple-touch-icon.png'),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
    },
    width: 650,
  })

  win.loadURL(process.env.ELECTRON_START_URL || `file://${path.join(__dirname, '../index.html')}`)
  return win
}

app.setName('markdown memory|sync')

if (process.platform === 'darwin') {
  app?.dock?.setIcon(path.join(__dirname, '../../public/apple-touch-icon.png'))
}

app.whenReady().then(() => {
  createWindow()

  console.log('READY')
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
