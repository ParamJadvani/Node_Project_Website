const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByAdminId,
  approveProduct,
} = require("../controllers/product.controller");
const { isExistFields } = require("../middlewares/isValidateField");
const { verifyToken } = require("../middlewares/JWT_AUTH");
const { isSuperAdmin, isAdmin, isNotUser } = require("../middlewares/role");
const upload = require("../utils/multer");

const productRouter = require("express").Router();

productRouter.get("/", getProducts);

productRouter.get("/adminId", verifyToken, isAdmin, getProductByAdminId);

productRouter.get("/:id", verifyToken, getProductById);

productRouter.post(
  "/",
  verifyToken,
  isAdmin,
  upload.single("image"),
  isExistFields,
  createProduct
);

productRouter.patch("/:id", verifyToken, isAdmin, updateProduct);

productRouter.patch("/:id/approve", verifyToken, isSuperAdmin, approveProduct);

productRouter.delete("/:id", verifyToken, isNotUser, deleteProduct);

module.exports = productRouter;
