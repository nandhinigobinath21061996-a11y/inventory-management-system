const express = require("express");
const router = express.Router();

const {
  addSupplier,
  getSuppliers,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplierController");

const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/", protect, getSuppliers);

router.post("/", protect, authorize("Admin"), addSupplier);

router.put("/:id", protect, authorize("Admin"), updateSupplier);

router.delete("/:id", protect, authorize("Admin"), deleteSupplier);

module.exports = router;