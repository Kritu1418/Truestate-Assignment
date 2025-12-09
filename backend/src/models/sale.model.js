const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
  CustomerID: String,
  CustomerName: String,
  PhoneNumber: String,
  Gender: String,
  Age: Number,
  CustomerRegion: String,
  CustomerType: String,

  ProductID: String,
  ProductName: String,
  Brand: String,
  ProductCategory: String,
  Tags: [String],

  Quantity: Number,
  PricePerUnit: Number,
  DiscountPercentage: Number,
  TotalAmount: Number,
  FinalAmount: Number,

  Date: Date,
  PaymentMethod: String,
  OrderStatus: String,
  DeliveryType: String,

  StoreID: String,
  StoreLocation: String,

  SalespersonID: String,
  EmployeeName: String
});

module.exports = mongoose.model("Sale", SaleSchema);
