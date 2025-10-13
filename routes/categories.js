const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");

// ✅ Add category (Admin only)
router.post("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const category = new Category({ name: req.body.name });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Get all categories (All users)
router.get("/", verifyToken, async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
