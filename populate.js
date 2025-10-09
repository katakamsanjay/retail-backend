const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("./models/User");
const Product = require("./models/Product");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      ssl: true,
      tlsAllowInvalidCertificates: true // bypass SSL verification for Windows
    });
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

const populate = async () => {
  try {
    await User.deleteMany({});
    await Product.deleteMany({});

    const adminPassword = await bcrypt.hash("123456", 10);
    const staffPassword = await bcrypt.hash("123456", 10);

    const users = [
      { name: "Admin User", email: "admin@example.com", password: adminPassword, role: "admin" },
      { name: "Staff User", email: "staff@example.com", password: staffPassword, role: "staff" }
    ];
    await User.insertMany(users);
    console.log("✅ Users inserted");

    const products = [
      { name: "Apple iPhone 15", sku: "IP15-001", price: 999, quantity: 50, description: "Latest Apple iPhone 15 with A17 chip" },
      { name: "Samsung Galaxy S24", sku: "SGS24-002", price: 899, quantity: 40, description: "Samsung Galaxy S24 with Snapdragon 8 Gen 3" },
      { name: "Sony WH-1000XM5 Headphones", sku: "SONY-003", price: 350, quantity: 20, description: "Noise-cancelling wireless headphones" },
      { name: "Dell XPS 13 Laptop", sku: "DELLX13-004", price: 1200, quantity: 15, description: "Dell XPS 13, 16GB RAM, 512GB SSD" },
      { name: "Logitech MX Master 3 Mouse", sku: "LOGIMX3-005", price: 100, quantity: 60, description: "Ergonomic wireless mouse for productivity" }
    ];
    await Product.insertMany(products);
    console.log("✅ Products inserted");

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

connectDB().then(populate);
