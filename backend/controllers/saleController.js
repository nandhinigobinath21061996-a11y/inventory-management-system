const Sale = require("../models/Sale");
const Product = require("../models/Product");

// =========================================================
// ADD SALE
// =========================================================

const addSale = async (req, res) => {
  try {
    const {
      product,
      quantity,
      sellingPrice,
      saleDate,
      customerName,
      notes,
    } = req.body;

    const existingProduct =
      await Product.findById(product);

    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Check stock availability
    if (
      existingProduct.quantity <
      Number(quantity)
    ) {
      return res.status(400).json({
        message: "Insufficient stock",
      });
    }

    // Calculate total
    const totalAmount =
      Number(quantity) *
      Number(sellingPrice);

    // Create sale
    const sale =
      await Sale.create({
        product,
        quantity,
        sellingPrice,
        totalAmount,
        saleDate,
        customerName,
        notes,
        user: req.user._id,
      });

    // Reduce stock
    existingProduct.quantity -=
      Number(quantity);

    await existingProduct.save();

    res.status(201).json({
      message:
        "Sale added successfully",
      sale,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// =========================================================
// GET ALL SALES
// =========================================================

const getSales = async (req, res) => {
  try {
    const sales =
      await Sale.find()
        .populate(
          "product",
          "name brand image"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json(
      sales
    );

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


module.exports = {
  addSale,
  getSales,
};