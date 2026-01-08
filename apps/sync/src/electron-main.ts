import { app, BrowserWindow } from 'electron'
import * as path from 'path'

const icon = '../renderer/apple-touch-icon.png'

function createWindow() {
  const win = new BrowserWindow({
    height: 450,
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

  console.log('READY')
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
