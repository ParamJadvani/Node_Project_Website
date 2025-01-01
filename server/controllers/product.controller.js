const Product = require("../models/product.model");

const getProducts = async (req, res) => {
  const { title, category } = req.query;
  const filter = {};

  try {
    // Build filter query
    if (title) filter.title = new RegExp(title, "i");
    if (category) filter.category = category;

    const products = await Product.find(filter).populate("user", "name email");
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found." });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve products. Please try again later.",
      error: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    const product = await Product.findById(id)
      .populate("user", "name email")
      .populate("ratings")
      .populate("comments");

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve the product. Please try again later.",
      error: error.message,
    });
  }
};

const getProductByAdminId = async (req, res) => {
  const userId = req.user._id;

  try {

    const products = await Product.find({ user: userId });
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this admin." });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve products for the admin.",
      error: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  const { title, description, price, category, InStockQty } = req.body;
  const image = req?.file?.path;
  const user = req.user._id;

  try {
  

    const product = await Product.create({
      title,
      description,
      price,
      category,
      image: image || "No picture uploaded",
      InStockQty,
      user,
    });

    res.status(201).json({
      message: "Product created successfully.",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create the product. Please try again later.",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    if (req?.file?.path) {
      req.body.image = req.file.path;
    }

    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({
      message: "Product updated successfully.",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update the product. Please try again later.",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({
      message: "Product deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete the product. Please try again later.",
      error: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByAdminId,
};
