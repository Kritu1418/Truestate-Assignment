const path = require("path");
const Database = require("better-sqlite3");

// Sahi absolute path generate karega
const dbPath = path.join(__dirname, "..", "..", "database", "sales.db");

// DB open
const db = new Database(dbPath);

module.exports = db;
