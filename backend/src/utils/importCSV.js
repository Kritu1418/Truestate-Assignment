const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const db = require("./db");

module.exports = function importData(req, res) {
  try {
    const csvPath = path.join(__dirname, "../../import/dataset.csv");

    if (!fs.existsSync(csvPath)) {
      return res.status(404).json({ error: "dataset.csv not found on server" });
    }

    // Create table if missing
    db.prepare(`
      CREATE TABLE IF NOT EXISTS sales (
        TransactionID TEXT,
        Date TEXT,
        CustomerID TEXT,
        CustomerName TEXT,
        PhoneNumber TEXT,
        Gender TEXT,
        Age INTEGER,
        CustomerRegion TEXT,
        CustomerType TEXT,
        ProductID TEXT,
        ProductName TEXT,
        Brand TEXT,
        ProductCategory TEXT,
        Tags TEXT,
        Quantity INTEGER,
        PricePerUnit REAL,
        DiscountPercentage REAL,
        TotalAmount REAL,
        FinalAmount REAL,
        PaymentMethod TEXT,
        OrderStatus TEXT,
        DeliveryType TEXT,
        StoreID TEXT,
        StoreLocation TEXT,
        SalespersonID TEXT,
        EmployeeName TEXT
      )
    `).run();

    const insert = db.prepare(`
      INSERT INTO sales VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `);

    let count = 0;

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => {
        const vals = Object.values(row);
        insert.run(vals);
        count++;
      })
      .on("end", () => {
        res.json({ message: "Import complete", total: count });
      });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed import" });
  }
};
