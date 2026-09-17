const Product = require("../models/Product");
const Supplier = require("../models/Supplier");
const Purchase = require("../models/Purchase");
const Sale = require("../models/Sale");

// =========================================================
// DASHBOARD STATS
// =========================================================

const getDashboardStats = async (req, res) => {
  try {
    const totalProducts =
      await Product.countDocuments();

    const totalSuppliers =
      await Supplier.countDocuments();

    const totalPurchases =
      await Purchase.countDocuments();

    const totalSales =
      await Sale.countDocuments();

    // LOW STOCK
    const lowStock = await Product.find({
      quantity: { $lte: 5 },
    }).select(
      "name brand quantity image"
    );

    // RECENT SALES
    const recentSales = await Sale.find()
      .populate(
        "items.product",
        "name brand image"
      )
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      totalProducts,
      totalSuppliers,
      totalPurchases,
      totalSales,
      lowStockCount: lowStock.length,
      lowStock,
      recentSales,
    });

  } catch (error) {
    console.error(
      "Dashboard Stats Error:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};


// =========================================================
// SALES REPORT
// =========================================================

const getSalesReport = async (req, res) => {
  try {
    const { from, to } = req.query;

    let filter = {};

    if (from && to) {
      filter.saleDate = {
        $gte: new Date(from),
        $lte: new Date(to),
      };
    }

    const sales = await Sale.find(filter)
      .populate(
        "items.product",
        "name brand image size color"
      )
      .sort({
        saleDate: -1,
      });

    // Calculate total sales amount
    const totalSalesAmount = sales.reduce(
      (total, sale) =>
        total + Number(sale.totalAmount || 0),
      0
    );

    res.status(200).json({
      sales,
      totalSalesAmount,
    });

  } catch (error) {
    console.error(
      "Sales Report Error:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};


// =========================================================
// PURCHASE REPORT
// =========================================================

const getPurchaseReport = async (req, res) => {
  try {
    const { from, to } = req.query;

    let filter = {};

    if (from && to) {
      filter.purchaseDate = {
        $gte: new Date(from),
        $lte: new Date(to),
      };
    }

    const purchases =
      await Purchase.find(filter)
        .populate(
          "product",
          "name brand image"
        )
        .populate(
          "supplier",
          "name company"
        )
        .sort({
          purchaseDate: -1,
        });

    const totalPurchaseAmount =
      purchases.reduce(
        (total, purchase) =>
          total +
          Number(purchase.quantity || 0) *
          Number(purchase.purchasePrice || 0),
        0
      );

    res.status(200).json({
      purchases,
      totalPurchaseAmount,
    });

  } catch (error) {
    console.error(
      "Purchase Report Error:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};


// =========================================================
// EXPORTS
// =========================================================

module.exports = {
  getDashboardStats,
  getSalesReport,
  getPurchaseReport,
};