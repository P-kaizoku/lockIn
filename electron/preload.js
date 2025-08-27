const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  minimize: () => ipcRenderer.send("window-minimize"),
  close: () => ipcRenderer.send("window-close"),
  maximize: () => ipcRenderer.send("window-maximize"),
  unmaximize: () => ipcRenderer.send("window-unmaximize"),

  // Ask main process if window is maximized
  checkMaximized: () => ipcRenderer.send("window-check-maximized"),

  // Listen for updates from main process
  onMaximizedStatus: (callback) => {
    ipcRenderer.on("window-maximized-status", (_, status) => callback(status));
  },
});
