const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

const getCartByUserId = async (req, res) => {
  try {
    const userId = req.user._id;

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
  try {
    const { product } = req.body;
    const userId = req.user._id;

    if (!product) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    const productExists = await Product.findById(product);
    if (!productExists) {
      return res.status(404).json({ message: "Product not found." });
    }

    const existingCart = await Cart.findOne({ product, user: userId });

    if (existingCart) {
      existingCart.quantity += 1;
      existingCart.totalPrice = existingCart.quantity * productExists.price; // Update total price
      await existingCart.save();
      return res.status(200).json({
        message: "Product quantity increased in cart.",
        cart: existingCart,
      });
    }

    // Create a new cart entry
    const newCart = await Cart.create({
      product,
      quantity: 1,
      user: userId,
      totalPrice: productExists.price,
    });

    res.status(201).json({
      message: "Product added to cart.",
      cart: newCart,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFromCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    if (!cartId) {
      return res.status(400).json({ message: "Cart ID is required." });
    }

    const deletedCart = await Cart.findByIdAndDelete(cartId);

    if (!deletedCart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    res
      .status(200)
      .json({ message: "Product deleted from cart.", cart: deletedCart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateQuantity = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { increase } = req.query;

    if (!cartId) {
      return res.status(400).json({ message: "Cart ID is required." });
    }

    if (increase !== "true" && increase !== "false") {
      return res
        .status(400)
        .json({ message: "Invalid query parameter for increase." });
    }

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    // Increment or decrement the quantity
    cart.quantity += increase === "true" ? 1 : -1;

    if (cart.quantity <= 0) {
      await Cart.findByIdAndDelete(cartId);
      return res
        .status(200)
        .json({ message: "Product removed from cart.", cart: cart });
    }

    const product = await Product.findById(cart.product);
    cart.totalPrice = cart.quantity * product.price; // Update total price
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
