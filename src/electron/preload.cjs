const { contextBridge, ipcRenderer } = require('electron');

console.log("[LOG]: Desde el ipc");

contextBridge.exposeInMainWorld('electron', {
  platform: process.platform,
  versions: process.versions
});

contextBridge.exposeInMainWorld("cv", {
  findAll: () => ipcRenderer.invoke("cv:findAll"),
  findById: (id) => ipcRenderer.invoke("cv:findById", id),
  create: (data) => ipcRenderer.invoke("cv:create", data),
  createProject:(data) => ipcRenderer.invoke("cv:createProject", data),
  update: (data) => ipcRenderer.invoke("cv:update", data),
  delete: (id) => ipcRenderer.invoke("cv:delete", id),
});
