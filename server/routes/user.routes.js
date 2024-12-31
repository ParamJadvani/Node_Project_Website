const express = require("express");
const {
  SignUp,
  Login,
  deleteUser,
  GetUsers,
  VerifyAccount,
  verifyAdminAccount,
  blockAdminAccount,
} = require("../controllers/user.controllers");
const upload = require("../utils/multer");
const isValidateField = require("../middlewares/isValidateField");
const { verifyToken } = require("../middlewares/JWT_AUTH");
const { isSuperAdmin } = require("../middlewares/role");

const UserRouter = express.Router();

UserRouter.get("/", GetUsers);

UserRouter.post("/register", upload.single("profile"), isValidateField, SignUp);

UserRouter.post("/login", isValidateField, Login);

UserRouter.get("/verify/:token/:otp", VerifyAccount);

UserRouter.delete("/:id", deleteUser);

UserRouter.patch(
  "/:adminId/verifyadmin",
  verifyToken,
  isSuperAdmin,
  verifyAdminAccount
);

UserRouter.patch(
  "/:adminID/verifyadmin",
  verifyToken,
  isSuperAdmin,
  blockAdminAccount
);
module.exports = UserRouter;
