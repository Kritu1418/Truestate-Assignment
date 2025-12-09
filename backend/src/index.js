const express = require('express');
const cors = require('cors');
require('dotenv').config();

const saleRoutes = require('./routes/sale.routes');

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', saleRoutes);

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
