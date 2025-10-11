const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cors({
  origin: "https://retail-frontend-silk.vercel.app/",
  credentials: true
}));

// MongoDB connection with TLS fix for Windows
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      tlsAllowInvalidCertificates: true // fixes TLS/SSL error on Windows
    });
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running with MongoDB Atlas!");
});

// Routes (later: auth & products)
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
