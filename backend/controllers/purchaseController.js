const Purchase = require("../models/Purchase");
const Product = require("../models/Product");

// =========================================================
// ADD PURCHASE
// =========================================================

const addPurchase = async (req, res) => {
  try {
    const {
      product,
      supplier,
      quantity,
      purchasePrice,
      purchaseDate,
      notes,
    } = req.body;

    // Check product exists
    const existingProduct =
      await Product.findById(product);

    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Calculate total amount
    const totalAmount =
      Number(quantity) * Number(purchasePrice);

    // Create purchase
    const purchase =
      await Purchase.create({
        product,
        supplier,
        quantity,
        purchasePrice,
        totalAmount,
        purchaseDate,
        notes,
        user: req.user._id,
      });

    // Update product stock
    existingProduct.quantity +=
      Number(quantity);

    await existingProduct.save();

    res.status(201).json({
      message:
        "Purchase added successfully",
      purchase,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// =========================================================
// GET ALL PURCHASES
// =========================================================

const getPurchases = async (req, res) => {
  try {
    const purchases =
      await Purchase.find()
        .populate(
          "product",
          "name brand image"
        )
        .populate(
          "supplier",
          "company"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json(
      purchases
    );

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


module.exports = {
  addPurchase,
  getPurchases,
};