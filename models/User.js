const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // plaintext for simplicity
  role: { type: String, enum: ["admin", "staff"], default: "staff" },
}, { timestamps: true });

userSchema.methods.comparePassword = function (password) {
  return password === this.password;
};

module.exports = mongoose.model("User", userSchema);
