const Database = require('better-sqlite3');

// SQLite database connect

const db = new Database('./database/sales.db');

module.exports = db;
