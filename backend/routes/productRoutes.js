const express = require("express");

const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

// Staff + Admin
router.get("/", protect, getProducts);
router.get("/:id", protect, getProductById);

// Admin only
router.post("/", protect, authorize("Admin"), addProduct);
router.put("/:id", protect, authorize("Admin"), updateProduct);
router.delete("/:id", protect, authorize("Admin"), deleteProduct);

module.exports = router;