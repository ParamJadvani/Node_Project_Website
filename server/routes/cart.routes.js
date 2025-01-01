const {
  getCartByUserId,
  addToCart,
  updateQuantity,
  deleteFromCart,
} = require("../controllers/cart.controller");
const { isAdmin } = require("../middlewares/role");

const cartRouter = require("express").Router();

cartRouter.get("/user", getCartByUserId);

cartRouter.post("/", isAdmin, addToCart);

cartRouter.patch("/:cartId/qty", updateQuantity);

cartRouter.delete("/:cartId", deleteFromCart);

module.exports = cartRouter;
