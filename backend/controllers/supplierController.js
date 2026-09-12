const Supplier = require("../models/Supplier");

// Add Supplier
const addSupplier = async (req, res) => {
  try {
    const { name, company, phone, address } = req.body;

    if (!name || !company || !phone) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const supplierExists = await Supplier.findOne({ company });

    if (supplierExists) {
      return res.status(400).json({
        message: "Supplier already exists",
      });
    }

    const supplier = await Supplier.create({
      name,
      company,
      phone,
      address,
    });

    res.status(201).json(supplier);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Suppliers
const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find().sort({ createdAt: -1 });

    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Supplier
const updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
      return res.status(404).json({
        message: "Supplier not found",
      });
    }

    supplier.name = req.body.name ?? supplier.name;
    supplier.company = req.body.company ?? supplier.company;
    supplier.phone = req.body.phone ?? supplier.phone;
    supplier.address = req.body.address ?? supplier.address;

    const updatedSupplier = await supplier.save();

    res.status(200).json(updatedSupplier);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Supplier
const deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
      return res.status(404).json({
        message: "Supplier not found",
      });
    }

    await supplier.deleteOne();

    res.status(200).json({
      message: "Supplier deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addSupplier,
  getSuppliers,
  updateSupplier,
  deleteSupplier,
};