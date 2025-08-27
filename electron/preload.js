const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  // Your existing window controls
  minimize: () => ipcRenderer.send("window-minimize"),
  close: () => ipcRenderer.send("window-close"),
  maximize: () => ipcRenderer.send("window-maximize"),
  unmaximize: () => ipcRenderer.send("window-unmaximize"),
  checkMaximized: () => ipcRenderer.send("window-check-maximized"),
  onMaximizedStatus: (callback) => {
    ipcRenderer.on("window-maximized-status", (_, status) => callback(status));
  },

  // Simple database methods
  addTask: (taskName, estimatedTime) =>
    ipcRenderer.invoke("add-task", taskName, estimatedTime),
  getTasks: () => ipcRenderer.invoke("get-tasks"),
  completeTask: (taskId) => ipcRenderer.invoke("complete-task", taskId),
  deleteTask: (taskId) => ipcRenderer.invoke("delete-task", taskId),
});
