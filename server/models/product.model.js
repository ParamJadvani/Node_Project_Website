const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required."],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required."],
      min: [0, "Price must be a positive number."],
    },
    description: {
      type: String,
      required: [true, "Product description is required."],
    },
    InStockQty: {
      type: Number,
      required: [true, "Stock quantity is required."],
      min: [0, "Stock quantity must be a positive number."],
    },
    image: {
      type: String,
      required: true,
      default: "No picture uploaded",
    },
    category: {
      type: String,
      required: [true, "Product category is required."],
      trim: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
