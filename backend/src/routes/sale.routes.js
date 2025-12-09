const express = require('express');
const router = express.Router();

const { getSales, getTags } = require('../controllers/sale.controller');


// GET Route for searching, filtering, sorting, pagination
router.get('/sales', getSales);

// NEW — GET unique tags list
router.get('/tags', getTags);

module.exports = router;
