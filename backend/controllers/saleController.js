const Sale = require("../models/Sale");
const Product = require("../models/Product");

// =========================================================
// ADD SALE
// =========================================================

const addSale = async (req, res) => {
  try {
    const {
      items,
      saleDate,
      customerName,
      notes,
    } = req.body;

    // Check items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "At least one product is required",
      });
    }

    let totalAmount = 0;
    const saleItems = [];

    // Process every product
    for (const item of items) {
      console.log("Product ID received:", item.product);

      // Find product
      const existingProduct = await Product.findById(
        item.product
      );

      console.log(
        "Product found:",
        existingProduct ? existingProduct.name : null
      );

      // Product not found
      if (!existingProduct) {
        return res.status(404).json({
          message: `Product not found: ${item.product}`,
        });
      }

      // Check quantity
      const quantity = Number(item.quantity);

      if (!quantity || quantity < 1) {
        return res.status(400).json({
          message: "Invalid quantity",
        });
      }

      // Check stock
      if (existingProduct.quantity < quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${existingProduct.name}`,
        });
      }

      // Selling price
      const sellingPrice = Number(item.sellingPrice);

      if (sellingPrice < 0 || isNaN(sellingPrice)) {
        return res.status(400).json({
          message: `Invalid selling price for ${existingProduct.name}`,
        });
      }

      // Item total
      const itemTotal = quantity * sellingPrice;

      totalAmount += itemTotal;

      // Add item to sale
      saleItems.push({
        product: existingProduct._id,
        quantity: quantity,
        sellingPrice: sellingPrice,
        totalAmount: itemTotal,
      });

      // Reduce stock
      existingProduct.quantity -= quantity;

      await existingProduct.save();
    }

    // Create sale
    const sale = await Sale.create({
      items: saleItems,
      totalAmount: totalAmount,
      saleDate: saleDate || Date.now(),
      customerName: customerName || "",
      notes: notes || "",
      user: req.user._id,
    });

    // Response
    res.status(201).json({
      message: "Sale added successfully",
      sale,
    });

  } catch (error) {
    console.error("ADD SALE ERROR:", error);

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
    const sales = await Sale.find()
      .populate(
        "items.product",
        "name brand image size color"
      )
      .sort({
        createdAt: -1,
      });

    res.status(200).json(sales);

  } catch (error) {
    console.error("GET SALES ERROR:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// =========================================================
// EXPORT
// =========================================================

module.exports = {
  addSale,
  getSales,
};