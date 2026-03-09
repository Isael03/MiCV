import { ipcMain } from "electron";

export const registerCVIpc = () => {
  ipcMain.handle("cv:findAll", async () => {
    console.log("[LOG] Desde el ipc findAll");
  });
  ipcMain.handle("cv:create", () => {});
  ipcMain.handle("cv:createProject", (data)=>{

  })
  ipcMain.handle("cv:findById", (event, id: string) => {});
  ipcMain.handle("cv:update", () => {});
  ipcMain.handle("cv:delete", (event, id:string) => {});
};
