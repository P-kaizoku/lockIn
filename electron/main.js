const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const Database = require("better-sqlite3");

let win;
let db;

// Better SQLite setup
function initDatabase() {
  const userDataPath = app.getPath("userData");
  const dbPath = path.join(userDataPath, "tasks.db");

  try {
    db = new Database(dbPath);
    console.log("Connected to SQLite database with better-sqlite3");

    // Create a simple tasks table
    db.exec(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_name TEXT NOT NULL,
        estimated_time INTEGER NOT NULL,
        completed BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (err) {
    console.error("Database error:", err);
  }
}

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

  win.on("maximize", () => {
    win.webContents.send("window-maximized-status", true);
  });
  win.on("unmaximize", () => {
    win.webContents.send("window-maximized-status", false);
  });
}

app.whenReady().then(() => {
  initDatabase();
  createWindow();
});

app.on("window-all-closed", () => {
  if (db) {
    db.close();
  }
  if (process.platform !== "darwin") app.quit();
});

// Your existing window controls
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

// Simple database operations (much cleaner with better-sqlite3!)
ipcMain.handle("add-task", async (event, taskName, estimatedTime) => {
  try {
    const stmt = db.prepare(
      "INSERT INTO tasks (task_name, estimated_time) VALUES (?, ?)"
    );
    const result = stmt.run(taskName, estimatedTime);
    return { id: result.lastInsertRowid, taskName, estimatedTime };
  } catch (err) {
    throw err;
  }
});

ipcMain.handle("get-tasks", async () => {
  try {
    const stmt = db.prepare("SELECT * FROM tasks ORDER BY created_at DESC");
    return stmt.all();
  } catch (err) {
    throw err;
  }
});

ipcMain.handle("complete-task", async (event, taskId) => {
  try {
    const stmt = db.prepare("UPDATE tasks SET completed = 1 WHERE id = ?");
    const result = stmt.run(taskId);
    return { success: result.changes > 0 };
  } catch (err) {
    throw err;
  }
});

ipcMain.handle("delete-task", async (event, taskId) => {
  try {
    const stmt = db.prepare("DELETE FROM tasks WHERE id = ?");
    const result = stmt.run(taskId);
    return { success: result.changes > 0 };
  } catch (err) {
    throw err;
  }
});
