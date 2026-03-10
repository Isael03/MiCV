import { contextBridge, ipcRenderer } from "electron";

console.log("[LOG]: Desde el ipc");

contextBridge.exposeInMainWorld("electron", {
  platform: process.platform,
  versions: process.versions,
});

contextBridge.exposeInMainWorld("cv", {
  findAll: () => ipcRenderer.invoke("cv:findAll"),
  findById: (id: string) => ipcRenderer.invoke("cv:findById", id),
  create: (data: any) => ipcRenderer.invoke("cv:create", data),
  createProject: (data: { title: string }) =>
    ipcRenderer.invoke("cv:createProject", data),
  update: (data: any) => ipcRenderer.invoke("cv:update", data),
  delete: (id: string) => ipcRenderer.invoke("cv:delete", id),
});
