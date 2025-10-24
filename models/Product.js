const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
});

// ✅ Auto-generate SKU in serial order
productSchema.pre("save", async function (next) {
  if (!this.sku) {
    const count = await mongoose.model("Product").countDocuments();
    this.sku = `SKU-${(count + 1).toString().padStart(4, "0")}`;
  }
  next();
});

module.exports = mongoose.model("Product", productSchema);
