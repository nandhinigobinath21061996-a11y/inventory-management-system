const mongoose = require("mongoose");

const saleItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    sellingPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const saleSchema = new mongoose.Schema(
  {
    items: {
      type: [saleItemSchema],
      required: true,
      validate: {
        validator: function (items) {
          return items.length > 0;
        },
        message: "At least one product is required",
      },
    },

    saleDate: {
      type: Date,
      default: Date.now,
    },

    customerName: {
      type: String,
      trim: true,
      default: "",
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sale", saleSchema);