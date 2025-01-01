const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByAdminId,
} = require("../controllers/product.controller");
const { isExistFields } = require("../middlewares/isValidateField");
const { verifyToken } = require("../middlewares/JWT_AUTH");
const { isSuperAdmin, isAdmin } = require("../middlewares/role");
const upload = require("../utils/multer");

const productRouter = require("express").Router();

productRouter.get("/", verifyToken, isSuperAdmin, getProducts);

productRouter.get("/adminId", verifyToken, isAdmin, getProductByAdminId);

productRouter.get("/:id", verifyToken, isSuperAdmin, getProductById);

productRouter.post(
  "/",
  verifyToken,
  isAdmin,
  isExistFields,
  upload.single("image"),
  createProduct
);

productRouter.patch("/:id", verifyToken, isAdmin, updateProduct);

productRouter.delete("/:id", verifyToken, isAdmin, deleteProduct);

module.exports = productRouter;
