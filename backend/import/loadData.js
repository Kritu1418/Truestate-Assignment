const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");
const csv = require("csv-parser");

// DB path fix for Render
const db = new Database(path.join(__dirname, "../database/sales.db"));

// CSV file (must exist exactly as dataset.csv)
const csvFilePath = path.join(__dirname, "dataset.csv");

// Create sales table
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

console.log("Table ready. Starting import...");

const insert = db.prepare(`
  INSERT INTO sales (
    TransactionID, Date, CustomerID, CustomerName, PhoneNumber, Gender, Age,
    CustomerRegion, CustomerType, ProductID, ProductName, Brand,
    ProductCategory, Tags, Quantity, PricePerUnit, DiscountPercentage,
    TotalAmount, FinalAmount, PaymentMethod, OrderStatus, DeliveryType,
    StoreID, StoreLocation, SalespersonID, EmployeeName
  )
  VALUES (
    @TransactionID, @Date, @CustomerID, @CustomerName, @PhoneNumber, @Gender, @Age,
    @CustomerRegion, @CustomerType, @ProductID, @ProductName, @Brand,
    @ProductCategory, @Tags, @Quantity, @PricePerUnit, @DiscountPercentage,
    @TotalAmount, @FinalAmount, @PaymentMethod, @OrderStatus, @DeliveryType,
    @StoreID, @StoreLocation, @SalespersonID, @EmployeeName
  )
`);

let count = 0;

const normalize = (row) => ({
  TransactionID: row["Transaction ID"],
  Date: row["Date"],
  CustomerID: row["Customer ID"],
  CustomerName: row["Customer Name"],
  PhoneNumber: row["Phone Number"],
  Gender: row["Gender"],
  Age: row["Age"],
  CustomerRegion: row["Customer Region"],
  CustomerType: row["Customer Type"],
  ProductID: row["Product ID"],
  ProductName: row["Product Name"],
  Brand: row["Brand"],
  ProductCategory: row["Product Category"],
  Tags: row["Tags"],
  Quantity: row["Quantity"],
  PricePerUnit: row["Price per Unit"],
  DiscountPercentage: row["Discount Percentage"],
  TotalAmount: row["Total Amount"],
  FinalAmount: row["Final Amount"],
  PaymentMethod: row["Payment Method"],
  OrderStatus: row["Order Status"],
  DeliveryType: row["Delivery Type"],
  StoreID: row["Store ID"],
  StoreLocation: row["Store Location"],
  SalespersonID: row["Salesperson ID"],
  EmployeeName: row["Employee Name"]
});

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", (row) => {
    insert.run(normalize(row));
    count++;
    if (count % 5000 === 0) console.log(`${count} rows imported...`);
  })
  .on("end", () => {
    console.log(`IMPORT COMPLETE — ${count} rows inserted.`);
  });
