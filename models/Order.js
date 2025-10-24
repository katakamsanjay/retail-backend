// backend/models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        name: String,
        price: Number,
        qty: Number,
      },
    ],
    total: Number,
    user: String, // staff name or email
    cashReceived: Number, // new
    change: Number, // new
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
