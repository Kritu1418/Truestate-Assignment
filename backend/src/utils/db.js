const path = require("path");
const fs = require("fs");
const Database = require("better-sqlite3");

// Render or local par database folder create karo
const dbDir = path.join(__dirname, "../../database");

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// DB file path
const dbPath = path.join(dbDir, "sales.db");

// Connect
const db = new Database(dbPath);

module.exports = db;
