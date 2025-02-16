const {
  getCartByUserId,
  addToCart,
  updateQuantity,
  deleteFromCart,
} = require("../controllers/cart.controller");
const { verifyToken } = require("../middlewares/JWT_AUTH");

const cartRouter = require("express").Router();

cartRouter.get("/user", verifyToken, getCartByUserId);

cartRouter.post("/", verifyToken, addToCart);

cartRouter.patch("/:cartId/qty", verifyToken, updateQuantity);

cartRouter.delete("/:cartId", verifyToken, deleteFromCart);

module.exports = cartRouter;
