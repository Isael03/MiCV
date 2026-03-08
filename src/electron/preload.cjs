const { contextBridge, ipcRenderer } = require('electron')

console.log("[LOG]: Desde el ipc");

contextBridge.exposeInMainWorld('electron', {
  platform: process.platform,
  versions: process.versions
})
