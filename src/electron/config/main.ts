import "reflect-metadata";

// Electron es CommonJS, necesitamos usar createRequire para cargarlo
import { createRequire } from "module";
import { fileURLToPath } from "url";
import path from "path";

// Polyfill para __dirname y __filename en ES modules
globalThis.__filename = fileURLToPath(import.meta.url);
globalThis.__dirname = path.dirname(globalThis.__filename);

const require = createRequire(import.meta.url);
const electron = require("electron");
const { app, BrowserWindow } = electron;

app.disableHardwareAcceleration();
app.commandLine.appendSwitch("disable-gpu-shader-disk-cache");
app.commandLine.appendSwitch("disable-gpu-cache");

import { join } from "path";
import { registerAllIpcEvents } from "../ipc";
import { AppDataSource, disconnectDatabase } from "../../backend/database/typeorm";

// Since main.js and preload.cjs are both bundled into dist-electron/
// they will always be siblings in both dev and production.
const resolvedPreloadPath = join(globalThis.__dirname, "preload.mjs");

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
    win.loadFile(join(globalThis.__dirname, "../dist/index.html"));
  }
}

app.whenReady().then(async () => {
  // Initialize TypeORM connection
  try {
    await AppDataSource.initialize();
    console.log("TypeORM connection established");
  } catch (error) {
    console.error("TypeORM initialization error:", error);
  }

  registerAllIpcEvents();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      //createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  disconnectDatabase()
  if (process.platform !== "darwin") {
    app.quit();
  }
});
