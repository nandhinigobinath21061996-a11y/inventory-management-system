const express = require("express");
const router = express.Router();

const {
  addPurchase,
  getPurchases,
} = require("../controllers/purchaseController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// Get all purchases
router.get("/", protect, getPurchases);

// Add a purchase (Admin only)
router.post("/", protect, authorize("Admin"), addPurchase);

module.exports = router;