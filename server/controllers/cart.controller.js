const Cart = require("../models/cart.model");

const getCartByUserId = async (req, res) => {
  const userId = req.user._id;

  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const cart = await Cart.find({ user: userId }).populate("product"); // Populate product details
    if (!cart || cart.length === 0) {
      return res.status(404).json({ message: "Cart not found for this user." });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addToCart = async (req, res) => {
  const { product } = req.body;
  const userId = req.user._id;

  try {
    if (!product) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    // Validate if the product exists in the Product collection
    const productExists = await Product.findById(product);
    if (!productExists) {
      return res.status(404).json({ message: "Product not found." });
    }

    const existingCart = await Cart.findOne({ product, user: userId });

    if (existingCart) {
      existingCart.quantity += 1;
      await existingCart.save();
      return res.status(200).json({
        message: "Product quantity increased in cart.",
        cart: existingCart,
      });
    }

    const newCart = await Cart.create({ product, quantity: 1, user: userId });
    return res.status(201).json({
      message: "Product added to cart.",
      cart: newCart,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFromCart = async (req, res) => {
  const { cartId } = req.params;

  try {
    if (!cartId) {
      return res.status(400).json({ message: "Cart ID is required." });
    }

    const deletedCart = await Cart.findByIdAndDelete(cartId);

    if (!deletedCart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    res.status(200).json({ message: "Product deleted from cart." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateQuantity = async (req, res) => {
  const { cartId } = req.params; // Get cartId from params
  const { increase } = req.query; // Get increase from query

  try {
    // Validate cartId
    if (!cartId) {
      return res.status(400).json({ message: "Cart ID is required." });
    }

    // Validate increase query parameter
    if (increase !== "true" && increase !== "false") {
      return res
        .status(400)
        .json({ message: "Invalid query parameter for increase." });
    }

    // Find cart by ID
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    // Increment or decrement the quantity
    cart.quantity += increase === "true" ? 1 : -1;

    // Handle case when quantity drops to 0 or below
    if (cart.quantity <= 0) {
      await Cart.findByIdAndDelete(cartId);
      return res.status(200).json({ message: "Product removed from cart." });
    }

    // Save updated cart
    await cart.save();

    res.status(200).json({ message: "Quantity updated.", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCartByUserId,
  addToCart,
  deleteFromCart,
  updateQuantity,
};
