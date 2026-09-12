const Product = require("../models/Product");

// =========================================================
// ADD PRODUCT
// =========================================================

const addProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      category,
      size,
      color,
      quantity,
      purchasePrice,
      sellingPrice,
      supplier,
      image,
    } = req.body;

    if (
      !name ||
      !brand ||
      !category ||
      !size ||
      !color ||
      quantity === undefined ||
      purchasePrice === undefined ||
      sellingPrice === undefined ||
      !supplier
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const product = await Product.create({
      name,
      brand,
      category,
      size,
      color,
      quantity,
      purchasePrice,
      sellingPrice,
      supplier,
      image: image || "",
      user: req.user._id,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// =========================================================
// GET ALL PRODUCTS
// =========================================================

const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("supplier", "company")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// =========================================================
// GET SINGLE PRODUCT
// =========================================================

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("supplier", "company")
      .populate("user", "name email");

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// =========================================================
// UPDATE PRODUCT
// =========================================================

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.name =
      req.body.name ?? product.name;

    product.brand =
      req.body.brand ?? product.brand;

    product.category =
      req.body.category ?? product.category;

    product.size =
      req.body.size ?? product.size;

    product.color =
      req.body.color ?? product.color;

    product.quantity =
      req.body.quantity ?? product.quantity;

    product.purchasePrice =
      req.body.purchasePrice ??
      product.purchasePrice;

    product.sellingPrice =
      req.body.sellingPrice ??
      product.sellingPrice;

    product.supplier =
      req.body.supplier ??
      product.supplier;

    product.image =
      req.body.image ??
      product.image;

    const updatedProduct =
      await product.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// =========================================================
// DELETE PRODUCT
// =========================================================

const deleteProduct = async (req, res) => {
  try {
    const product =
      await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// =========================================================
// EXPORTS
// =========================================================

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};