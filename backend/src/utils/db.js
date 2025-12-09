const path = require("path");
const Database = require("better-sqlite3");

// Render absolute path fix
const dbPath = path.join(__dirname, "../database/sales.db");

const db = new Database(dbPath);

module.exports = db;
