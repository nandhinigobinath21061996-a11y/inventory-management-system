const express = require("express");
const router = express.Router();

const {
  addSale,
  getSales,
} = require("../controllers/saleController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// Get all sales
router.get("/", protect, getSales);

// Add sale (Admin only)
router.post("/", protect, authorize("Admin"), addSale);

module.exports = router;