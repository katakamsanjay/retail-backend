require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const users = [
  { name: "Admin User", email: "admin@example.com", password: "123456", role: "admin" },
  { name: "Staff User", email: "staff@example.com", password: "123456", role: "staff" },
  { name: "John Doe", email: "john@example.com", password: "123456", role: "staff" },
  { name: "Jane Smith", email: "jane@example.com", password: "123456", role: "staff" },
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
};

const populate = async () => {
  try {
    await User.deleteMany(); // remove old users
    await User.insertMany(users); // insert plain text users
    console.log("✅ Users populated successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

connectDB().then(populate);
