const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 700,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(__dirname, "../frontend/dist/index.html"));
  }

  // ✅ tell renderer when state changes
  win.on("maximize", () => {
    win.webContents.send("window-maximized-status", true);
  });

  win.on("unmaximize", () => {
    win.webContents.send("window-maximized-status", false);
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// ✅ window controls
ipcMain.on("window-minimize", () => win?.minimize());
ipcMain.on("window-close", () => win?.close());
ipcMain.on("window-maximize", () => {
  if (win && !win.isMaximized()) win.maximize();
});
ipcMain.on("window-unmaximize", () => {
  if (win && win.isMaximized()) win.unmaximize();
});
ipcMain.on("window-check-maximized", (event) => {
  event.reply("window-maximized-status", win?.isMaximized());
});
