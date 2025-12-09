const express = require("express");
const router = express.Router();
const importCSV = require("../utils/importCSV");

router.get("/import-data", importCSV);

module.exports = router;
