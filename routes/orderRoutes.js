// backend/routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// POST /api/orders
router.post("/", async (req, res) => {
  try {
    const { items, total, user, cashReceived } = req.body;
    if (!items || !items.length) return res.status(400).json({ message: "Cart is empty" });

    const change = cashReceived - total;
    const newOrder = new Order({ items, total, user, cashReceived, change });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to place order" });
  }
});

// GET all orders
router.get("/", async (req, res) => {
  try {
    const { user } = req.query; // optional filter by staff
    const query = user ? { user } : {};
    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

module.exports = router;
