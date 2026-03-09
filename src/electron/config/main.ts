import "reflect-metadata";
import { app, BrowserWindow } from "electron";
app.disableHardwareAcceleration();
app.commandLine.appendSwitch("disable-gpu-shader-disk-cache");
app.commandLine.appendSwitch("disable-gpu-cache");
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { registerAllIpcEvents } from "../ipc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Since main.js and preload.cjs are both bundled into dist-electron/
// they will always be siblings in both dev and production.
const resolvedPreloadPath = join(__dirname, "preload.cjs");

console.log("Preload Path:", resolvedPreloadPath);
//const PRELOAD_PATH = join(__dirname, 'preload.js')

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: resolvedPreloadPath,
      contextIsolation: true,
      nodeIntegration: true,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    console.log("Loading dev server:", process.env.VITE_DEV_SERVER_URL);
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    win.loadFile(join(__dirname, "../dist/index.html"));
  }
}

app.whenReady().then(() => {
  registerAllIpcEvents();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      //createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
