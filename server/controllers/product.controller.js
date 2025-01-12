const Product = require("../models/product.model");
const User = require("../models/user.model");
const sendMailVerification = require("../service/sendMail");

const getProducts = async (req, res) => {
  const { title, category, id } = req.query;
  const filter = {};

  try {
    // Build filter query
    if (title) filter.title = new RegExp(title, "i");
    if (category) filter.category = category;
    if (id) filter._id = id;

    const products = await Product.find(filter).populate(
      "user",
      "username email"
    );
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
  const { role } = req.user;

  try {
    if (!id) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    let product = await Product.findById(id).populate("comments");

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Populate user only if isUser is false
    if (role !== "USER") {
      product = await product.populate("user", "username email");
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

    await User.findByIdAndUpdate(
      user,
      {
        $push: { products: product._id },
      },
      { new: true }
    );

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
  const { sendEmail } = req.query; // More descriptive query param name

  try {
    // Attempt to delete the product
    const product = await Product.findByIdAndDelete(id).populate(
      "user",
      "email"
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Send rejection email if `sendEmail` query is true
    if (sendEmail === "true") {
      const html = `<h1>Your product has been rejected</h1>`;
      try {
        await sendMailVerification(
          product.user.email,
          "Product Rejected",
          html
        );
      } catch (error) {
        return res.status(500).json({
          message: "Product deleted, but email notification failed.",
          error: error.message,
        });
      }
    }

    res.status(200).json({
      message: "Product deleted successfully.",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete the product. Please try again later.",
      error: error.message,
    });
  }
};

const approveProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // Approve the product
    const product = await Product.findByIdAndUpdate(
      id,
      { isVerified: true },
      { new: true }
    ).populate("user", "email");
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Send approval email
    const html = `<h1>Your product has been approved</h1>`;
    try {
      await sendMailVerification(product.user.email, "Product Approved", html);
    } catch (error) {
      return res.status(500).json({
        message: "Product approved, but email notification failed.",
        error: error.message,
      });
    }

    res.status(200).json({
      message: "Product approved successfully.",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to approve the product. Please try again later.",
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
  approveProduct,
};
